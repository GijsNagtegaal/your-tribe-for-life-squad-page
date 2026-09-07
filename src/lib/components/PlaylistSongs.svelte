<script>
	let { persons } = $props();


</script>

{#each persons as person (person.id)}
	<button>
        {#if person.fav_spotify_track && person.spotifyData}
            <p>{person.spotifyData.name}</p>
            <p>{person.spotifyData.artist}</p>
        {:else if person.fav_spotify_track}
            <p>Error, there is no info available</p>
        {/if}

		<audio>
            <source src="{person.audioUrl}">
        </audio>
		
		{#if person.mugshot}
			<img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
		{/if}
	</button>
{/each}

<style>
	img {
		max-width: 5rem;
		max-height: 5rem;
	}
</style>