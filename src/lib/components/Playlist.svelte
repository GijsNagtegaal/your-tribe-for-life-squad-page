<script>
    import Seperator from "./icons/Seperator.svelte";
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PauseIcon from "./icons/PauseIcon.svelte";
    import PlayingIcon from "./icons/PlayingIcon.svelte";
    import Prevpage from "./Prevpage.svelte";
    import Share from "./icons/Share.svelte";

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

<!-- good use of snippet element -->
<!-- https://svelte.dev/docs/svelte/snippet -->
{#snippet playButton()}
    <button onclick={togglePlaylist}>
        <i data-active={!isPlaying}><PlayIcon size="2rem" /></i>
        <i data-active={isPlaying}><PauseIcon size="2rem" /></i>
    </button>
{/snippet}

<header class="top-bar">
    <nav>
        <Prevpage />
        <h2>Playlist van jaar 26/27</h2>
    </nav>
    {@render playButton()}
</header>

<article class="playlist">
    <Prevpage />
    
    <header>
        <img src="src/lib/assets/playlist.png" alt="">
        <h2>Playlist van jaar 26/27</h2>
        <p>Luister hier naar de favoriete muziek van studenten en docenten in het eerste jaar</p>
    </header>

    <section class="controls">
        <menu>
            <span> 
                <p>Playlist</p>
                <Seperator size="0.3rem" />
                <p>{persons.length} nummers</p>
            </span>
            <a href="/playlist">
                <Share size="1rem" />
                Delen
            </a>
        </menu>
        {@render playButton()}
    </section>

    <section class="tracks">
        {#each persons as person, index (person.id)}
            <button 
                data-playing={currentTrackIndex === index} 
                onclick={() => toggleAudio(index)}
                onmouseenter={() => hoveredIndex = index} 
                onmouseleave={() => hoveredIndex = null}
            >
                <span>
                    <i data-active={currentTrackIndex === index && isPlaying && hoveredIndex === index}>
                        <PauseIcon />
                    </i>
                    <i data-active={currentTrackIndex === index && isPlaying && hoveredIndex !== index}>
                        <PlayingIcon />
                    </i>
                    <i data-active={(!isPlaying && currentTrackIndex === index) || (hoveredIndex === index && currentTrackIndex !== index)}>
                        <PlayIcon />
                    </i>
                    <i data-active={currentTrackIndex !== index && hoveredIndex !== index}>
                        {index + 1}
                    </i>
                </span>
                
                {#if person.spotifyData}
                    <h3>{person.spotifyData.name}</h3>
                    <p>{person.spotifyData.artist}</p>
                {/if}
                
                <audio bind:this={audioElements[index]} src={person.audioUrl} onended={() => playNext(index)}></audio>
                <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
            </button>
        {/each}
    </section>
</article>

<style>

    header.top-bar {
        position: fixed;
        top: 0;
        left: 50%;
        width: 100%;
        max-width: 800px;
        padding: 0.75rem 1rem;
        background: var(--background-color, #121212);
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    
        animation: slideDown linear both;
        animation-timeline: scroll(root block);
        animation-range: 200px 400px;

        nav {
            display: flex;
            align-items: center;
            gap: 1rem;

            h2 {
                margin: 0;
                font-size: 1.25rem;
            }
        }
    }

    header.top-bar button, section.controls button {
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
        position: relative;

        i {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            font-style: normal;

            &[data-active="true"] {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
        }
    }

    article.playlist {
        display: grid;
        grid-template-columns: 1fr auto;
        width: 100%;
        max-width: 800px;
        position: relative;
        margin: 0 auto;

        /* this way i can target the component with styling */
        &:global(:first-child) {
            grid-column: 1 / -1;
            grid-row: 1;
        }

        header {
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
    }

    section.controls {
        grid-column: 1 / -1;
        grid-row: 3 / span 2;
        display: contents;
        color: var(--color-neutral-mid);

        menu {
            grid-column: 1;
            grid-row: 3;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 2rem;
            margin-top: 0;
            padding: 0;

        span {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        }

        a {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        button {
            grid-column: 2;
            grid-row: 3 / span 2;
            align-self: start; 
            position: relative;
            z-index: 10;
        }
    }

    section.tracks {
        grid-column: 1 / span 2;
        grid-row: 4;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        button {
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

            &[data-playing="true"] h3 {
                color: var(--color-brand-mid);
            }

            span { 
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1rem;
                grid-row: 1 / span 2;
                grid-column: 1;
                width: 1.5rem;
                height: 1.5rem;

                i {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transform: rotate(-90deg) scale(0.5);
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    font-style: normal;

                    &[data-active="true"] {
                        opacity: 1;
                        transform: rotate(0deg) scale(1);
                    }
                }
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

    @keyframes slideDown {
        0% {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
            pointer-events: none;
        }
        100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>