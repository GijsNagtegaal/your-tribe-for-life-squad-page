<script>
	import PlaylistSongs from "$lib/components/PlaylistSongs.svelte";
	import PlaylistControls from "$lib/components/PlaylistControls.svelte";
	let { data } = $props();
</script>

<main>
	<PlaylistControls/>
	<PlaylistSongs persons={data.persons} />
</main>

<style>
	main {
		padding: 1rem;
	}
</style>