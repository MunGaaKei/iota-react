import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

export default [
	{
		input: "./packages/index.ts",
		output: [
			{
				name: "iota-react",
				dir: "lib",
				format: "esm",
				exports: "named",
				sourcemap: true,
			},
		],
		external: ["react", "react-dom", "react/jsx-runtime", /node_modules/],
		plugins: [
			terser(),
			resolve(),
			external(),
			scss({
				fileName: "css/index.css",
				sourceMap: true,
				outputStyle: "compressed",
			}),
		],
	},
	{
		input: "./packages/index.ts",
		output: [{ file: "./lib/index.d.ts", format: "es" }],
		plugin: [
			typescript({
				declaration: true,
				declarationDir: "./lib",
			}),
		],
	},
];
