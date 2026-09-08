<script>
    import Seperator from "./icons/Seperator.svelte";
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PauseIcon from "./icons/PauseIcon.svelte";
    import PlayingIcon from "./icons/PlayingIcon.svelte";

    let { persons = [] } = $props();
    
    let audioElements = [];
    let hoveredIndex = $state(null); 
    let currentTrackIndex = $state(null);
    let isPlaying = $state(false);

    let currentPerson = $derived(
        currentTrackIndex !== null ? persons[currentTrackIndex] : null
    );

    // Toggles a specific track from the list
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

    // Toggles the playlist from the main button
    function togglePlaylist() {
        if (persons.length === 0) return;
        
        // nothing playing = start the first track. Otherwise, toggle current.
        if (currentTrackIndex === null) {
            toggleAudio(0);
        } else {
            toggleAudio(currentTrackIndex);
        }
    }

    // play the next song automatically
    function playNext(currentIndex) {
        const nextIndex = currentIndex + 1;
        
        // Check if there is a next song in the playlist
        if (nextIndex < persons.length) {
            toggleAudio(nextIndex);
        } else {
            // reset all when last song is fininshed
            isPlaying = false;
            currentTrackIndex = null;
        }
    }
</script>

<!-- Controls -->
<section class="playlist-header">
    <header> 
        <p>Playlist</p>
        <Seperator />
        <p>{persons.length} nummers</p>
    </header>

    <a href="/">
        Delen
    </a>

    <button class="main-play-btn" onclick={togglePlaylist}>
        <span class="icon play" class:active={!isPlaying}>
            <PlayIcon size="2rem" />
        </span>
        <span class="icon pause" class:active={isPlaying}>
            <PauseIcon size="2rem" />
        </span>
    </button>
</section>

<!-- Songlist -->
<section class="track-list">
    {#each persons as person, index (person.id)}
        <button 
            class="track-btn {currentTrackIndex === index ? 'playing' : ''}" 
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
                onended={() => playNext(index)}>
            </audio>
            <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
        </button>
    {/each}
</section>


<style>

    /* --- Playlist Header Styles --- */
    .playlist-header {
        display: grid;
        width: 100%;
        min-height: 40px; 
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
    }
    
    .playlist-header header {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .playlist-header a {
        grid-column: 1;
        grid-row: 2;
    }

    .main-play-btn {
        grid-column: 2;
        grid-row: 1 / span 2;
        display: flex;
        align-items: center; 
        position: relative;
        color: var(--text-inverted);
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border: none;
        border-radius: var(--border-radius-circle);
        background: var(--color-brand-mid);
        cursor: pointer;
        padding: 0;
    }

    .main-play-btn .icon {
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

    .main-play-btn .icon.active {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    /* --- Tracklist Styles --- */
    .track-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .track-btn {
        all: unset;
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: repeat(2, 1.5rem);
        align-items: center;
        width: 100%;
        max-width: 800px;
        cursor: pointer;
        padding: 0.5rem 0;
        transition: background-color 0.2s;
    }

    .track-btn:focus-visible {
        border: 2px solid var(--color-brand-dark);
    }

    .track-btn:hover {
        background-color: var(--color-neutral-dark);
    }

    .track-btn.playing h3 {
        color: var(--color-brand-mid);
    }

    .track-list audio {
        display: none;
    }

    .track-list .status-icon {
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
    
    .track-list .icon {
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

    .track-list .icon.active {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    .track-list h3, .track-list .artist-name {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis;
        margin: 0;
    }

    .track-list h3 {
        font-size: var(--font-size-h5);
        grid-column: 2;
        grid-row: 1;
    }

    .track-list .artist-name {
        grid-column: 2;
        grid-row: 2;
        color: var(--color-neutral-mid);
    }

    .track-list img {
        padding: .5rem;
        grid-column: 3;
        grid-row: 1 / span 2; 
        width: 4rem;
        height: 4rem; 
        border-radius: var(--border-radius-circle);
        object-fit: cover;
    }
</style>