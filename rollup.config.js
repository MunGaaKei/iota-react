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
				format: "es",
				exports: "named",
				sourcemap: true,
				globals: {
					react: "React",
				},
			},
		],
		external: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"radash",
			"dayjs",
			"pubsub-js",
			"ahooks",
			/node_modules/,
		],
		plugins: [
			resolve({
				extensions: [".ts", ".tsx", ".scss", ".js"],
			}),
			typescript({
				include: ["packages/types.ts"],
				compilerOptions: {
					declaration: true,
					declarationDir: "lib",
					emitDeclarationOnly: true,
					isolatedModules: false,
				},
			}),
			external(),
			scss({
				fileName: "css/index.css",
				sourceMap: true,
				outputStyle: "compressed",
			}),
			terser(),
		],
	},
];
