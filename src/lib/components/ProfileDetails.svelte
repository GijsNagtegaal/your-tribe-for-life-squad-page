<script>
    let { person } = $props();

    function getAge(birthdate) {
        if (!birthdate) return null;

        const [year, month, day] = birthdate.split('-').map(Number);
        const today = new Date();
        let age = today.getFullYear() - year;

        if (
            today.getMonth() + 1 < month ||
            (today.getMonth() + 1 === month && today.getDate() < day)
        ) {
            age -= 1;
        }

        return age >= 0 ? age : null;
    }
</script>

<section>
    {#if person}
        <ul>
            <li>
                <h4 style="--favcolor: {person?.fav_color};">{person?.fav_color || 'Onbekend'}</h4>
                <span>kleur</span>
            </li>
            <li>
                <h4>
                    <span>{getAge(person?.birthdate) ?? 'Onbekend'}</span>
                    <span>{person?.birthdate || 'Onbekend'}</span>
                </h4>
                <span>leeftijd</span>
            </li>
            <li>
                <h4><a href={person?.team_s13 || '#'}>{person?.team_s13 || 'Onbekend'}</a></h4>
                <span>team</span>
            </li>
        </ul>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-md);

        ul {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100vw;
            margin: 16px 6px 0;
            padding: 0;
            list-style: none;

            li {
                text-align: center;
                cursor: pointer;

                &:first-child h4 {
                    color: var(--text);
                    transition: color 150ms ease;
                }

                &:first-child:hover h4,
                &:first-child:focus-within h4 {
                    color: var(--favcolor);
                }

                &:nth-child(2) h4 span {
                    display: none;
                    margin: 0;
                    color: inherit;
                }

                &:nth-child(2) h4 span:first-child,
                &:nth-child(2):hover h4 span:last-child {
                    display: inline;    
                }

                &:nth-child(2):hover h4 span:first-child {
                    display: none;
                }

                h4 {
                    margin: 0;
                    color: var(--text);
                    font-size: var(--font-size-body-sm);
                    line-height: 20px;
                    font-weight: var(--font-weight-regular);
                }
                span {
                    display: block;
                    margin-top: 4px;
                    color: var(--color-neutral-mid);
                    font-size: var(--font-size-body-sm);
                    line-height: 12px;
                    font-weight: var(--font-weight-regular);
                    
                }
            }

            @media (min-width: 400px) {
                width: 400px;
            }
        }
    }
</style>
