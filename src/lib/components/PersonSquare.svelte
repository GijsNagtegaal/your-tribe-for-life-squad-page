<script>
    import mugshotUnknown from '$lib/assets/mugshot-unknown.png';

    let { person } = $props();
</script>

<div class="person-square" style="background-color: {person.fav_color}"> <!--ja dat is hier prima want puur decoratief !-->
    <img src={person.mugshot ? `https://fdnd.directus.app/assets/${person.mugshot}` : mugshotUnknown} alt="foto van {person.name}" style="--favborderradius: {person.fav_border_radius}px;">
</div>

<style>
    .person-square{
        border-radius: var(--border-radius-small);
        padding: var(--spacing-sm);
        aspect-ratio: 1;
        img{
            width: 100%;
            height: 100%;
            object-position: center;
            object-fit: cover;
            border-radius: var(--favborderradius);
        }
    }
</style>