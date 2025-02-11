<script lang="ts">
	import type { PageData } from './$houdini'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
	const { KVDemoPage } = $derived(data)
	const page = $derived($KVDemoPage)
	const names = $derived(page.data?.KVNames ?? [])
</script>

<h1>Cloudflare KV Demo</h1>

<br />
<ul>
	{#each names as name}
		<li>{name}</li>
	{/each}
</ul>
