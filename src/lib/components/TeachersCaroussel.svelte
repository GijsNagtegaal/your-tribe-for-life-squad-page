<script>
    let { teachers } = $props();
    import PersonSquare from './PersonSquare.svelte';
    import PlayIcon from "$lib/components/icons/PlayIcon.svelte";
    import Heading from "$lib/components/Heading.svelte"
</script>

<section class="teachers">
    <header>
        <a href="/docenten"><Heading level={3} text="Docenten" /></a>
        <a href="/docenten">Toon allen</a>
    </header>

    <ul>
        {#each teachers as teacher}
            <li>
                <a href="/docenten/{teacher.slug}">
                    <figure>
                        <PersonSquare withPlay person={teacher} />
                        <figcaption>{teacher.name}</figcaption>
                    </figure>
                </a>
            </li>
        {/each}
    </ul>

</section>

<style>
    header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        a:hover{
            text-decoration: underline;
        }
    }
    ul{
        display: flex;
        overflow-x: auto;
        padding: 0;
        margin: 0;
        li{
            position: relative;
            
            &::before{
                content: "";
                position: absolute;
                inset: 0;
                background-color: var(--teacher-color, var(--color-neutral-dark));
                border-radius: var(--border-radius-xs);
                transform: scale(0.9);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                z-index: -1;
            }

            &:hover::before,
            &:focus-within::before {
                transform: scale(1);
                opacity: 1;
            }
        }
    }
    figure{
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        border-radius: var(--border-radius-xl);
        margin: var(--spacing-md);
        align-items: center;
        width: 10rem;
        margin: 0.7rem;

        figcaption{
            align-self: flex-start;
            text-align: left;
            width: 100%;
            background-color: inherit;
            padding: var(--spacing-xs) 0;
        }
    }
</style>