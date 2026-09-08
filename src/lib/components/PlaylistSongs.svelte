<script>
	let { persons } = $props();

    let currentPlayingIndex = $state(null);

    let audioElements = [];

    // this makes sure there can only be one song be playing at a time
    function toggleAudio(index) {
        const selectedAudio = audioElements[index];

        // If another song is already playing, pause it
        if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
            audioElements[currentPlayingIndex].pause();
        }

        // play/pause for the clicked button
        if (selectedAudio.paused) {
            selectedAudio.play();
            currentPlayingIndex = index;
        } else {
            selectedAudio.pause();
            currentPlayingIndex = null;
        }
    }
</script>

<section>
    <!-- https://svelte.dev/docs/svelte/each -->
    {#each persons as person, index (person.id)}
        <!-- make sure the correct song is played linked to the index number and add a class playing to the button for styles to toggle -->
        <button class={currentPlayingIndex === index ? 'playing' : ''} onclick={() => toggleAudio(index)}>
            <p>
                {#if currentPlayingIndex === index}
                    ⏸ 
                {:else}
                    {index + 1} 
                {/if}
            </p>
            {#if person.spotifyData}
                <h3>{person.spotifyData.name}</h3>
                <p>{person.spotifyData.artist}</p>
            {/if}
            <!-- make sure the correct song is played when clicked  -->
            <audio bind:this={audioElements[index]} src={person.audioUrl}></audio>
            
            <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
        </button>
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    button {
        all: unset;
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: repeat(2, 1.5rem);
        align-items: center;
        width: 100%;
        max-width: 800px;
        cursor: pointer;

        &:hover {
            background-color: var(--color-neutral-dark);
        }

        &.playing {
            h3 {
                color: var(--color-brand-mid);
            }
        }
    }

    audio {
        display: none;
    }

    p, h3 {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis;
    }

    h3 {
        font-size: var(--font-size-h5);
        grid-column: 2;
        grid-row: 1;
    }

    p:nth-of-type(1) {
        display: flex;
        margin: 1rem;
        grid-row: 1 / span 2;
        grid-column: 1;

    }

    p:nth-of-type(2) {
        grid-column: 2;
        grid-row: 2;
        color: var(--color-neutral-mid);
    }

    img {
        padding: .5rem;
        grid-column: 3;
        grid-row: 1 / span 2; 
        width: 4rem;
        height: 4rem; 
        border-radius: var(--border-radius-circle);
        object-fit: cover;
    }

</style>