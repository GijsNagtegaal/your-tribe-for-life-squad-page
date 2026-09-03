<script>
     let { persons = [] } = $props();
</script>

<section>
    <!-- This will be replaced with a for loop -->
    <article>
        <figure>
            <img src="https://infinigeek.com/assets/keeping-your-laptop-from-overheating-tech-repair-diy-tips.png" alt="">
            <figcaption>
                <p>The blowdryers</p> 
            </figcaption>
        </figure>
        <ul>
            {#each persons as persons}
                <p style="--favcolor: {persons.fav_color};">{persons.name}</p>
            {/each}
        </ul>
    </article>
</section>

<style>

    section {
        display: flex;
        overflow-x: auto;
        margin: 1rem;
        gap: 3rem;
    }

    article {
        max-width: 400px;
        height: fit-content;
    }

    figure {
        margin: 0;
        display: flex;
        position: relative;

        img {
            width: 10rem;
            height: 10rem;
            aspect-ratio: 1/1;
            object-fit: cover;
        }

        figcaption {
            display: flex;
            width: 100%;
            background-color: var(--transparent);
            position: absolute;
            left: 0;
            bottom: 0;

            p {
                display: flex;
                margin: .5rem 0;
                color: var(---text);
            }
        }
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 1rem 0;
        list-style: none;
        line-break: normal;
        gap: 0.5rem;

        p {
            margin: 0;
            display: flex;
            justify-content: center;
            background-color: var(--primary-accent);
            color: var(--text-inverted);
            border-radius: var(--border-small);
            font-weight: bold;
            padding: 0rem 0.5rem;

            @supports (color: contrast-color(red)) {
                background: var(--favcolor);
                color: contrast-color(var(--favcolor));
            }
        }
    }
    
</style>