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
            <p class="status-icon">
                <!-- Pause: playing and hovered -->
                <span class="icon" class:active={currentTrackIndex === index && isPlaying && hoveredIndex === index}>
                    <PauseIcon />
                </span>
                
                <!-- Playing: playing but not hovered -->
                <span class="icon" class:active={currentTrackIndex === index && isPlaying && hoveredIndex !== index}>
                    <PlayingIcon />
                </span>
                
                <!-- Play: hovered OR it's the current track that is paused -->
                <span class="icon" class:active={(!isPlaying && currentTrackIndex === index) || (hoveredIndex === index && currentTrackIndex !== index)}>
                    <PlayIcon />
                </span>
                
                <!-- Default Number: not playing, not paused-current, not hovered -->
                <span class="icon" class:active={currentTrackIndex !== index && hoveredIndex !== index}>
                    {index + 1}
                </span>
            </p>
            
            {#if person.spotifyData}
                <h3>{person.spotifyData.name}</h3>
                <p class="artist-name">{person.spotifyData.artist}</p>
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
        gap: 1rem;
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
        padding: 0.5rem 0;

        &:focus-visible {
            border: 2px solid var(--color-brand-dark);
        }

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
    .status-icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        grid-row: 1 / span 2;
        grid-column: 1;
        width: 1.5rem;
        height: 1.5rem;
    }
    .icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: rotate(-90deg) scale(0.5);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }

    .icon.active {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    h3, .artist-name {
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

    .artist-name {
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