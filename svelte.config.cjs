const sveltePreprocess = require("svelte-preprocess");
const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");
const { resolve } = require("path");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		preserve: ["ld+json"],
		defaults: {
			script: "typescript",
			style: "scss",
		},
		scss: {
			prependData: `@import '${__dirname}/src/style/_theme.scss';`,
			renderSync: true,
		},
	}),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
			server: { https: true },
			build: {
				minify: "terser",
				// target: "es2015",
				chunkSizeWarningLimit: 1000,
				commonjsOptions: { experimentalDynamicImport: true },
			},
			resolve: {
				alias: {
					$uikit: resolve(
						__dirname,
						"./src/components/uikit"
					),
					$svg: resolve(__dirname, "./src/components/svg"),
					$components: resolve(
						__dirname,
						"./src/components"
					),
					$stores: resolve(__dirname, "./src/stores"),
					$helpers: resolve(__dirname, "./src/helpers"),
				},
			},
		},
	},
};
