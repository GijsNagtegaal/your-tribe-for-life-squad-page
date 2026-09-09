<script>
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PauseIcon from "./icons/PauseIcon.svelte";
    // standard values
    let { 
        songName = "Die kenne we hier nie he", 
        artist = "Die kenne we hier nie he", 
        mugshot = "", 
        currentTime = 0,
        duration = 0,
        isPlaying = false,
        favcolor= "",
        togglePlayback
    } = $props();

    let progressPercentage = $derived(
        duration > 0 ? (currentTime / duration) * 100 : 0
    );
</script>

<aside style="--bg-color:{favcolor}4D" class="miniplayer">
    <section class="content">
        <img 
            src="https://fdnd.directus.app/assets/{mugshot}" 
            alt="{artist}" 
            class="mugshot"
        />

        <div class="info">
            <h4>{songName}</h4>
            <p>{artist}</p>
        </div>

        <button class="control-button" onclick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>
            <i data-active={!isPlaying}><PlayIcon size="2rem" /></i>
            <i data-active={isPlaying}><PauseIcon size="2rem" /></i>
        </button>

        <progress id="file" max="100" value="{progressPercentage}"></progress>
    </section>
</aside>

<style>

    aside {
        display: flex;
        width: 95%;
        position: fixed;
        bottom: 5rem;
        padding: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--bg-color);
        backdrop-filter: blur(20px);
        border-radius: var(--border-radius-sm);

        section {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto auto;
            gap: 0.5rem;
            width: 100%;
        }

        img {
            aspect-ratio: 1/1;
            width: 3rem;
            height: 3rem;
            object-fit: cover;
            border-radius: var(--border-radius-sm);
        }

        h4{
            font-size: var(--font-size-h5);
        }
    }

    .control-button {
        grid-column: 3;
        grid-row: 1;
        background: transparent;
        border: none;
        color: inherit;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        justify-self: center;
        padding: 0;

        i {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.5);
            transition: transform 0.2s ease, opacity 0.2s ease;
            pointer-events: none;
        }

        i[data-active="true"] {
            opacity: 1;
            transform: scale(1);
        }

        :global(svg) {
            fill: currentColor; 
        }
    }
    
    progress {
        grid-column: 1 / span 3;
        width: 100%;
        height: 5px;
        appearance: none;
        border: none;
        border-radius: var(--border-radius-sm);

        &::-webkit-progress-bar {
            background-color: var(--color-neutral-mid);
            border-radius: var(--border-radius-sm);
        }

        &::-webkit-progress-value {
            background-color: var(--color-brand-mid);
            border-radius: var(--border-radius-sm);
        }
    }
</style>