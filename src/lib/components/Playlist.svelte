<script>
    import Seperator from "./icons/Seperator.svelte";
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PauseIcon from "./icons/PauseIcon.svelte";
    import PlayingIcon from "./icons/PlayingIcon.svelte";
    import Prevpage from "./Prevpage.svelte";

    let { persons = [] } = $props();
    
    let audioElements = $state([]);
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

    function togglePlaylist() {
        if (persons.length === 0) return;
        
        if (currentTrackIndex === null) {
            toggleAudio(0);
        } else {
            toggleAudio(currentTrackIndex);
        }
    }

    function playNext(currentIndex) {
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < persons.length) {
            toggleAudio(nextIndex);
        } else {
            isPlaying = false;
            currentTrackIndex = null;
        }
    }
</script>

<article class="playlist">
    <Prevpage />
    
    <section class="hero">
        <img src="src/lib/assets/playlist.png" alt="">
        <h2>Playlist van jaar 26/27</h2>
        <p>Luister hier naar de favoriete muziek van studenten en docenten in het eerste jaar</p>
    </section>

    <section class="controls">
        <div class="controls-text">
            <header> 
                <p>Playlist</p>
                <Seperator />
                <p>{persons.length} nummers</p>
            </header>
            <a href="/">Delen</a>
        </div>

        <button class="play-btn" onclick={togglePlaylist}>
            <span class="icon" class:active={!isPlaying}>
                <PlayIcon size="2rem" />
            </span>
            <span class="icon" class:active={isPlaying}>
                <PauseIcon size="2rem" />
            </span>
        </button>
    </section>

    <section class="tracks">
        {#each persons as person, index (person.id)}
            <button 
                class="track-btn"
                class:playing={currentTrackIndex === index} 
                onclick={() => toggleAudio(index)}
                onmouseenter={() => hoveredIndex = index} 
                onmouseleave={() => hoveredIndex = null}
            >
                <span class="status-indicator">
                    <span class="icon" class:active={currentTrackIndex === index && isPlaying && hoveredIndex === index}>
                        <PauseIcon />
                    </span>
                    
                    <span class="icon" class:active={currentTrackIndex === index && isPlaying && hoveredIndex !== index}>
                        <PlayingIcon />
                    </span>
                    
                    <span class="icon" class:active={(!isPlaying && currentTrackIndex === index) || (hoveredIndex === index && currentTrackIndex !== index)}>
                        <PlayIcon />
                    </span>
                    
                    <span class="icon" class:active={currentTrackIndex !== index && hoveredIndex !== index}>
                        {index + 1}
                    </span>
                </span>
                
                {#if person.spotifyData}
                    <h3>{person.spotifyData.name}</h3>
                    <p>{person.spotifyData.artist}</p>
                {/if}
                
                <audio 
                    bind:this={audioElements[index]} 
                    src={person.audioUrl}
                    onended={() => playNext(index)}>
                </audio>
                
                <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
            </button>
        {/each}
    </section>
</article>

<style>
    .icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: rotate(-90deg) scale(0.5);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;

        &.active {
            opacity: 1;
            transform: rotate(0deg) scale(1);
        }
    }

    .playlist {
        display: grid;
        grid-template-columns: 1fr auto;
        width: 100%;
        max-width: 800px;
        position: relative;

        > :global(:first-child) {
            grid-column: 1 / -1;
            grid-row: 1;
        }

        .hero {
            grid-column: 1 / -1;
            grid-row: 2;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 2rem;

            img {
                width: 50%;
                align-self: center;
                justify-self: center;
            }
        }

        .controls {
            grid-column: 1 / -1;
            grid-row: 3 / span 2;
            display: contents;

            .controls-text {
                grid-column: 1;
                grid-row: 3;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 2rem;

                header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            }

            .play-btn {
                grid-column: 2;
                grid-row: 3 / span 2;
                align-self: start; 
                position: sticky;
                top: 1rem;
                z-index: 10;
                display: flex;
                align-items: center; 
                justify-content: center;
                color: var(--text-inverted);
                width: 3.5rem;
                height: 3.5rem;
                border: none;
                border-radius: var(--border-radius-circle);
                background: var(--color-brand-mid);
                padding: 0;
                cursor: pointer;
            }
        }

        .tracks {
            grid-column: 1;
            grid-row: 4;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .track-btn {
                all: unset;
                display: grid;
                grid-template-columns: auto 1fr auto;
                grid-template-rows: repeat(2, 1.5rem);
                align-items: center;
                width: 100%;
                padding: 0.5rem 0;
                cursor: pointer;

                &:focus-visible {
                    border: 2px solid var(--color-brand-dark);
                }

                &:hover {
                    background-color: var(--color-neutral-dark);
                }

                &.playing h3 {
                    color: var(--color-brand-mid);
                }

                .status-indicator { 
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

                h3, p {
                    grid-column: 2;
                    min-width: 0;
                    white-space: nowrap;
                    overflow: hidden; 
                    text-overflow: ellipsis;
                    margin: 0;
                }

                h3 {
                    font-size: var(--font-size-h5);
                    grid-row: 1;
                }

                p {
                    grid-row: 2;
                    color: var(--color-neutral-mid);
                }

                img {
                    padding: 0.5rem;
                    grid-column: 3;
                    grid-row: 1 / span 2; 
                    width: 4rem;
                    height: 4rem; 
                    border-radius: var(--border-radius-circle);
                    object-fit: cover;
                }

                audio {
                    display: none;
                }
            }
        }
    }
</style>