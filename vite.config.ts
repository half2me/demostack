import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import houdini from 'houdini/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [houdini(), sveltekit(), tailwindcss()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
