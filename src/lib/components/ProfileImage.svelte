<script>
    import mugshotUnknown from '$lib/assets/mugshot-unknown.png';

     let { person } = $props();
</script>

<section>
    {#if person?.mugshot}
        <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="Foto van {person.name}" />
    {:else}
        <img src={mugshotUnknown} alt="Geen foto gevonden voor {person?.name ?? 'onbekend persoon'}" />
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
        width: 30vw;
        height: 30vw;
        max-width: 8rem;
        max-height: 8rem;
        object-fit: cover;
        border-radius: var(--border-radius-circle);
    }
    }
</style>