<script>
    import mugshotUnknown from '$lib/assets/mugshot-unknown.png';
    import PlayIcon from "$lib/components/icons/PlayIcon.svelte";

    let { person, withPlay = false } = $props();
</script>

<div class="person-square" style="background-color: {person.fav_color}"> <!--ja dat is hier prima want puur decoratief !-->
    <img src={person.mugshot ? `https://fdnd.directus.app/assets/${person.mugshot}` : mugshotUnknown} alt="foto van {person.name}" style="--favborderradius: {person.fav_border_radius || 999}px;">
    {#if withPlay}
        <span class="play" style="background-color: {person.fav_color}">
            <PlayIcon />
        </span>
    {/if}
</div>

<style>
    .person-square{
        border-radius: var(--border-radius-xs);
        padding: var(--spacing-sm);
        aspect-ratio: 1;
        position: relative;
        overflow: hidden;
        background-color: var(--color-neutral-darker);

        img{
            width: 100%;
            height: 100%;
            object-position: center;
            object-fit: cover;
            border-radius: var(--favborderradius);
        }
        &:hover .play, &:focus-within .play{
            transform: translateY(0);
            opacity: 1;
        }
    }
    .play{
        position: absolute;
        display: flex;
        bottom: var(--spacing-md);
        right: var(--spacing-md);
        justify-content: center;
        padding: var(--spacing-sm);
        aspect-ratio: 1;
        border-radius: var(--border-radius-circle);
        background-color: var(--color-brand-dark);
        color: var(--color-neutral-darkest);
        box-shadow: 4px 4px 4px color-mix(in srgb, var(--color-neutral-darkest) 50%, transparent);
        transform: translateY(150%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
</style>