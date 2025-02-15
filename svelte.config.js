import adapter from '@sveltejs/adapter-cloudflare-workers'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],

	kit: {
		adapter: adapter(),
		alias: {
			$houdini: '.houdini/',
		},
	},

	extensions: ['.svelte', '.svx'],
}

export default config
