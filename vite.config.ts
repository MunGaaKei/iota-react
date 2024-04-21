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
});
