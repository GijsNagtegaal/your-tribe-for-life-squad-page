<script>
	let { persons } = $props();
</script>

{#each persons as person (person.id)}
	<p>{person.name}</p>
	<article>
		{#if person.spotifyData}
			<p>{person.spotifyData.name}</p>
			<p>{person.spotifyData.artist}</p>
		{/if}

		<audio controls src={person.audioUrl}></audio>
		
		{#if person.mugshot}
			<img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
		{/if}
	</article>
{/each}

<style>
	img {
		max-width: 5rem;
		max-height: 5rem;
	}
</style>