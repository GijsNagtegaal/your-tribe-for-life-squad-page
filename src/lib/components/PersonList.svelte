<script>
    import ProfileImage from '$lib/components/ProfileImage.svelte'
    import ProfileHeading from '$lib/components/ProfileHeading.svelte'
    import PlayIcon from "$lib/components/icons/PlayIcon.svelte";

    let { persons } = $props();
</script>


<ul>
    {#each persons as person}
        <li>
            <a href="/studenten/{person.slug}">
                <div class="image-wrapper">
                    <ProfileImage person={person}/>
                    <span class="play">
                        <PlayIcon />
                    </span>
                </div>
                <h4>{person.name}</h4>
            </a>
        </li>
    {/each}
</ul>


<style>
    ul{
        position: relative;
        display: grid;
        /*https://css-tricks.com/books/greatest-css-tricks/flexible-grids/*/
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        row-gap: var(--spacing-md);
        padding: 0;
        margin: 0 auto;
        max-width: 1000px;
        padding: var(--spacing-md);

        &::before{
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 60vh;
            background: linear-gradient(
                180deg,
                #00667b 0%,
                #002f38 49%,
                #101010 89%
            );
        }
        &::after{
            content: "";
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60vh;
            z-index: 2;
            pointer-events: none;
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.7) 0%,
                rgba(0, 0, 0, 0.47) 49%,
                rgba(0, 0, 0, 0) 89%
            );
        }
    }
   
    .image-wrapper{
        position: relative;
    }

    li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: var(--spacing-md) 0;
        h4{
            padding: var(--spacing-md);
            }
        &:hover .play, &:focus-within .play{
            transform: translateY(0);
            opacity: 1;
        }
    }

    .play{
        position: absolute;
        display: flex;
        bottom: 0rem;
        right: 6rem;

        justify-content: center;
        padding: var(--spacing-sm);    
        aspect-ratio: 1;
        border-radius: var(--border-radius-circle);
        background-color: var(--color-brand-dark);
        color: var(--color-neutral-darkest);
        box-shadow: 4px 4px 4px color-mix(in srgb, var(--color-neutral-darkest) 50%, transparent);
        transform: translateY(100%);
        opacity: 0;
        @media (prefers-reduced-motion: no-preference) {
            transition:transform 0.3s ease, opacity 0.3s ease;
        }
    }
</style>