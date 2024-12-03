import typescript from "@rollup/plugin-typescript";
import { resolve } from "path";
import { defineConfig } from "vite";

const path = (p) => resolve(__dirname, p);

export default defineConfig({
	build: {
		minify: true,
		cssMinify: true,
		lib: {
			entry: path("./index.ts"),
			name: "iota-react",
			fileName: (name) => `index.${name}.js`,
		},
		outDir: "lib",
		sourcemap: true,
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
					target: "es2015",
					exclude: path("node_modules"),
					allowSyntheticDefaultImports: true,
				}),
			],
		},
	},
});
