const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === "test" || BABEL_ENV === "commonjs";

module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					esmodules: true,
				},
				// Use the equivalent of `babel-preset-modules`
				bugfixes: true,
				modules: false,
				loose: true,
			},
		],
		"@babel/preset-react",
	],
	plugins: [
		["@babel/proposal-decorators", { legacy: true }],
		"@babel/transform-react-jsx",
		["@babel/plugin-proposal-class-properties", { loose: true }],
		["@babel/plugin-proposal-private-methods", { loose: true }],
		["@babel/plugin-proposal-private-property-in-object", { loose: true }],
		[
			"@babel/transform-runtime",
			{
				useESModules: !cjs,
				version: require("./package.json").dependencies["@babel/runtime"].replace(/^[^0-9]*/, ""),
			},
		],
		[
			"babel-plugin-module-resolver",
			{
				root: ["./src"],
				alias: {
					// Add your aliases here
					"@/lib": "./lib",
					"@/icons": "./icons",
				},
			},
		],
	].filter(Boolean),
	assumptions: {
		enumerableModuleMeta: true,
	},
};
