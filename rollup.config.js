import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import path from "path";
import pkg from "./package.json";

const env = process.env.NODE_ENV;

const extensions = [".js", ".ts", ".tsx", ".json"];
console.log(path.resolve(__dirname, "src/lib"));
const config = {
	input: "src/lib/index.js",
	external: Object.keys(pkg.peerDependencies || {}).concat("react-dom"),
	output: {
		format: "umd",
		name: "DebugMeister",
		globals: {
			react: "React",
			redux: "Redux",
			"react-dom": "ReactDOM",
		},
	},
	plugins: [
		nodeResolve({
			extensions,
		}),
		babel({
			include: "src/**/*",
			exclude: "**/node_modules/**",
			babelHelpers: "runtime",
			extensions,
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify(env),
			preventAssignment: true,
		}),
		commonjs(),
		url(),
		svgr({ icon: true }),
		alias({
			/**
			 * For custom files extension you might want to add "customerResolver"
			 * https://github.com/rollup/plugins/tree/master/packages/alias#custom-resolvers
			 *
			 * By doing that this plugin can read different kind of files.
			 */
			entries: [
				{
					find: "@/",
					replacement: path.resolve(__dirname, "src"),
				},
				// {
				// 	find: "@/lib",
				// 	replacement: path.resolve(__dirname, "src/lib"),
				// },
				// {
				// 	find: "@/icons",
				// 	replacement: path.resolve(__dirname, "src/icons"),
				// },
			],
		}),
	],
};

if (env === "production") {
	config.plugins.push(
		terser({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
			},
		})
	);
}

export default config;
