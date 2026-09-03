<script>
    import PlayIcon from "$lib/components/icons/PlayIcon.svelte";
    import PauseIcon from "$lib/components/icons/PauseIcon.svelte";

    let isPlaying = $state(true);

    function togglePlay() {
        isPlaying = !isPlaying;
    }
</script>

<button onclick={togglePlay}>
    <span class="icon play" class:active={isPlaying}>
        <PlayIcon size="2rem" />
    </span>
    <span class="icon pause" class:active={!isPlaying}>
        <PauseIcon size="2rem" />
    </span>
</button>

<style>
    button {
        position: relative;
        display: flex;
        color: var(--text-inverted);
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border: none;
        border-radius: var(--border-round);
        background: var(--primary-accent);
        cursor: pointer;
        padding: 0;
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
</style>