<script>
    let { persons } = $props();
    import mugshotUnknown from '$lib/assets/mugshot-unknown.png';


</script>

<section class="teacher-carrousel">
    <ul>
        {#each persons as person}
            <li>
                <a href="/docenten/{person.slug}">
                    <figure style="--favcolor: {person.fav_color ?? 'var(--color-secondary-light)'};">
                    <div class="image-wrapper">
                        <img src={person.mugshot ? `https://fdnd.directus.app/assets/${person.mugshot}` : mugshotUnknown} alt="foto van {person.name}" style="--favborderradius: {person.fav_border_radius}px;">
                    </div>
                            <figcaption>{person.name}</figcaption>
                    </figure>
                </a>
            </li>
        {/each}
    </ul>
</section>

<style>
    ul{
        display: flex;
        overflow-x: auto;
        padding: 0;
        margin: 0;
    }

    figure{
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        border-radius: var(--border-radius-small);
        margin: var(--spacing-md);
        padding-left: 0;
        align-items: center;
        width: 10rem;

        .image-wrapper{
            background-color: var(--favcolor); /*word de fav color van die persoon */
            padding: var(--spacing-sm);
            aspect-ratio: 1;
        }
        
        img{
            border-radius: var(--border-radius-circle); /*word de fav border radius van die persoon */
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            object-fit: cover;
            border-radius: var(--favborderradius);
        }

        figcaption{
            align-self: flex-start;
            text-align: left;
            width: 100%;
            background-color: var(--background);
            padding: var(--spacing-xs) 0;
        }

    }
    

</style>