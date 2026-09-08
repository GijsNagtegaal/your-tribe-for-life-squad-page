<script>
	import PlaylistSongs from "$lib/components/PlaylistSongs.svelte";
	let { data } = $props();
</script>

<main>
	<PlaylistSongs persons={data.persons} />
</main>

<style>
	main {
		padding: 1rem;
	}
</style>