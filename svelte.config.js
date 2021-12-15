import sveltePreprocess from "svelte-preprocess";
import netlify from "@sveltejs/adapter-netlify";
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		preserve: ["ld+json"],
		defaults: {
			script: "typescript",
			style: "scss",
		},
		scss: {
			prependData: `@import './src/style/_theme.scss';`,
			renderSync: true,
		},
	}),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: netlify(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		vite: {
			server: { https: true },
			ssr: {
				noExternal: [
					"style-value-types",
					"popmotion",
					"framesync",
				],
			},
			optimizeDeps: {
				include: ["fastq"],
			},
			build: {
				minify: "terser",
				// target: "es2015",
				chunkSizeWarningLimit: 1000,
			},
			resolve: {
				alias: {
					$uikit: resolve("./src/components/uikit"),
					$svg: resolve("./src/components/svg"),
					$components: resolve("./src/components"),
					$stores: resolve("./src/stores"),
					$helpers: resolve("./src/helpers"),
					env: resolve("./src/env.ts"),
				},
			},
		},
	},
};

export default config;
