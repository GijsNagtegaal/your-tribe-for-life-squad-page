<script>
	import Playlist from "$lib/components/Playlist.svelte";
	let { data } = $props();
</script>

<main>

	<Playlist persons={data.persons} />
</main>

<style>
	main {
		scroll-timeline: --main-timeline;
		overflow-y: auto;
		padding: 1rem;
	}
	
</style>