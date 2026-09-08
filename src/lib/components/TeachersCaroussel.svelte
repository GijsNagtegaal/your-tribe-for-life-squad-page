<script>
    let { persons } = $props();
    import mugshotUnknown from '$lib/assets/mugshot-unknown.png';
    import PersonSquare from './PersonSquare.svelte';


</script>

<section class="teacher-carrousel">
    <ul>
        {#each persons as person}
            <li>
                <a href="/docenten/{person.slug}">
                    <figure>
                        <PersonSquare {person} />
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

        figcaption{
            align-self: flex-start;
            text-align: left;
            width: 100%;
            background-color: var(--background);
            padding: var(--spacing-xs) 0;
        }

    }
    

</style>