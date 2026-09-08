<script>
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PauseIcon from "./icons/PauseIcon.svelte";
    import PlayingIcon from "./icons/PlayingIcon.svelte";

    let { persons } = $props();
    let audioElements = [];
    
    // Make hoveredIndex reactive!
    let hoveredIndex = $state(null); 
    
    let currentTrackIndex = $state(null);
    let isPlaying = $state(false);

    let currentPerson = $derived(
        currentTrackIndex !== null ? persons[currentTrackIndex] : null
    );

    function toggleAudio(index) {
        const selectedAudio = audioElements[index];

        if (currentTrackIndex !== null && currentTrackIndex !== index) {
            audioElements[currentTrackIndex].pause();
        }

        currentTrackIndex = index;

        if (selectedAudio.paused) {
            selectedAudio.play();
            isPlaying = true;
        } else {
            selectedAudio.pause();
            isPlaying = false;
        }
    }
</script>

<section>
    {#each persons as person, index (person.id)}
        <button 
            class={currentTrackIndex === index ? 'playing' : ''} 
            onclick={() => toggleAudio(index)}
            onmouseenter={() => hoveredIndex = index} 
            onmouseleave={() => hoveredIndex = null}
        >
        <p>
            {#if currentTrackIndex === index && isPlaying && hoveredIndex === index}
                <!-- playing and being hovered -->
                <PauseIcon />
            {:else if currentTrackIndex === index && isPlaying}
                <!-- playing not hovered -->
                <PlayingIcon />
            {:else if hoveredIndex === index || currentTrackIndex === index}
                <!-- hovered or it's the current track that is paused -->
                <PlayIcon />
            {:else}
                <!-- Default, neither playing, not paused-current, not hovered -->
                {index + 1}
            {/if}
        </p>
            
            {#if person.spotifyData}
                <h3>{person.spotifyData.name}</h3>
                <p>{person.spotifyData.artist}</p>
            {/if}
            
            <audio 
                bind:this={audioElements[index]} 
                src={person.audioUrl}
                onended={() => {
                    isPlaying = false;
                    currentTrackIndex = null;
                }}>
            </audio>
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