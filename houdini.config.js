/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	runtimeDir: '.houdini',
	schemaPath: 'src/schema.graphql',
	plugins: {
		'houdini-svelte': {
			forceRunesMode: true,
		},
	},
}

export default config
