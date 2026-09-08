<script>
	import Playlist from "$lib/components/Playlist.svelte";
	let { data } = $props();
</script>

<main>
	<Playlist persons={data.persons} />
</main>

<style>
	main {
		padding: 1rem;
	}
</style>