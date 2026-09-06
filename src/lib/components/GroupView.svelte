<script>
    let { persons = [] } = $props();

    // Group everyone by semester13 group
    let groupedByTeam = $derived(
        persons
            .filter(person => person.team_s13)
            .reduce((acc, person) => {
                const teamName = person.team_s13; 
                
                if (!acc[teamName]) {
                    acc[teamName] = [];
                }
                
                acc[teamName].push(person);
                return acc;
            }, {})
    );

    // Put it into an array
    let groupArray = $derived(
        Object.entries(groupedByTeam).map(([team, members]) => ({
            team,
            members
        }))
    );
</script>

<section>
    {#each groupArray as { team, members}}
        <article>
            <figure>
                <img src="https://infinigeek.com/assets/keeping-your-laptop-from-overheating-tech-repair-diy-tips.png" alt="">
                <figcaption>
                    <p>{team} {members.length}</p> 
                </figcaption>
            </figure>
            <ul>
                {#each members as person}
                    <li>
                        <a href="/studenten/{person.slug}" style="--favcolor: {person.fav_color};">
                            {person.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </article>
    {/each}
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

        a {
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