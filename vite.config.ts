import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dynamicImport()],
	resolve: {
		alias: {
			"@p": resolve(__dirname, "./packages"),
			"@d": resolve(__dirname, "./docs"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, "./packages/index.ts"),
			name: "iota-react",
			fileName: (name) => `index.${name}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "react-dom",
				},
			},
			plugins: [
				typescript({
					tslib: resolve("typescript"),
					outDir: resolve(__dirname, "./lib"),
				}),
			],
		},
	},
});
