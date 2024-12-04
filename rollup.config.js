import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

export default {
	input: "./packages/index.ts",
	output: [
		{
			name: "iota-react",
			dir: "lib",
			format: "esm",
			exports: "named",
			sourcemap: true,
			globals: {
				react: "React",
			},
		},
	],
	external: ["react", "react-dom", "react/jsx-runtime", /node_modules/],
	plugins: [
		typescript({
			// compilerOptions: {
			// 	lib: ["ESNext", "dom"],
			// 	target: "es6",
			// 	declaration: true,
			// 	declarationDir: "./lib",
			// },
			tsconfig: "./tsconfig.json",
			// include: ["./packages"],
		}),
		terser(),
		resolve(),
		external(),
		scss({
			fileName: "css/index.css",
			sourceMap: true,
			outputStyle: "compressed",
		}),
	],
};
