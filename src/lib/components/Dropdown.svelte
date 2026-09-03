<script>
    import PrevIcon from "$lib/components/icons/PrevIcon.svelte";
</script>

<details>
    <summary>
        Jaar 1
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
    </summary>
    <ul>
        <li>
            <a href="/playlist/jaar1">Jaar 1</a>
        </li>
        <li>
            <a href="/playlist/jaar2">Jaar 2</a>
        </li>
    </ul>
    
    
</details>
<style>
    details {
        width: fit-content;
    }

    summary {
        display: flex;
        align-items: center;
        list-style: none;
        font-size: 1rem;
        gap: 0.5rem;
        background-color: var(--primary-accent);
        border-radius: 1.5rem;
        padding: .3rem 1rem;
        color: var(--text-inverted);
        cursor: pointer;

        transition: border-radius 0.2s ease;

        svg {
            width: 1rem;
            height: 1rem;
            stroke: 0.25rem;
            fill: var(--text-inverted);
            transition: transform 0.3s ease;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-accent);
        border-radius: 0 0 1.5rem 1.5rem;
        
        overflow: hidden; 
        max-height: 0;
        opacity: 0;
        transition: max-height 0.3s ease-out, 
                    opacity 0.3s ease-out, 
                    display 0.3s ease-out allow-discrete;

        li {
            list-style: none;
            width: 100%;

            a {
                color: var(--text-inverted);
                display: block;
                padding: 0.5rem 0;
                text-align: center;
                
                &:nth-of-type(1) {
                    width: 100%;
                    border-bottom: 1px solid var(--background);
                }
            }
        }
    }

    details[open] {
        summary {
            border-radius: 1.5rem 1.5rem 0 0;
            svg {
                transform: rotate(90deg);
            }
        }
        
        ul {
            max-height: 200px;
            opacity: 1;
        }
    }

    @starting-style {
        details[open] ul {
            max-height: 0;
            opacity: 0;
        }
    }
</style>