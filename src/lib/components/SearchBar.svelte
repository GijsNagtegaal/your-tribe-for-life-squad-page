<script>
    //https://svelte.dev/docs/svelte/transition
    import { fade } from 'svelte/transition';
    import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
    import PersonSquare from './PersonSquare.svelte';
    
    let { persons } = $props();

    let searchTerm = $state('');
    let results = $derived(
        persons.filter(person => 
            person.name.toLowerCase().includes(searchTerm.toLowerCase())    
        )
    );

    function getProfilePath(person) {
        const isTeacher = person.role?.some(({ role_id }) => role_id?.name !== 'student');
        const profileType = isTeacher ? 'docenten' : 'studenten';

        return `/${profileType}/${person.slug}`;
    }
</script>

<search>
    <form>
        <label>
            <SearchIcon size="2rem" />
            <span class="sr-only">Zoek een persoon</span>
            <input type="text" bind:value={searchTerm} placeholder="Wie wil je opzoeken?">
        </label>
    </form>
</search>

{#if searchTerm}
    <section class="searchResults" transition:fade>
        {#if results.length > 0}
            <h3>Resultaten voor "{searchTerm}"</h3>
            <ul>
                {#each results as person (person.id)}
                    <li>
                        <a href={getProfilePath(person)}>
                            <span class="image-wrapper">
                                <PersonSquare {person}/>
                            </span>
                            <p>{person.name}</p>
                        </a>
                    </li>
                {/each}
            </ul>
            {:else}
            <h4>Geen zoekresultaten gevonden voor "{searchTerm}"</h4>
            <p>Controleer de spelling of probeer een andere naam.</p>
        {/if}
    </section>
    {:else}
{/if}

<style>
    form{
        display: flex;
        flex-direction: column;

        label{
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-md) var(--spacing-lg);
            border: 0.15rem solid var(--color-neutral-darker);
            border-radius: var(--border-radius-3xl);
            background-color: var(--color-neutral-darker);

            .sr-only{
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            &:hover, &:focus-within{
                border-color: var(--color-neutral-lighter);
                background-color: var(--color-neutral-dark);
            }
        }

        input{
            border: none;
            background: none;
            outline: none;
            width: 100%;
        }

        input::placeholder{
            font-size: var(--font-size-body-md);
            font-family: var(--font-primary);
        }
    }

    .searchResults{
        background-color: var(--color-neutral-darker);
        padding: var(--spacing-md) var(--spacing-md);
        border-radius: var(--border-radius-xl);
        margin-top: var(--spacing-xs);
        
        h3{
            margin-top: var(--spacing-md);
            color: var(--color-neutral-lightest);
            padding-left: var(--spacing-md);
        }
        ul{
            padding: 0;
            li{
                margin: var(--spacing-sm);
                padding: var(--spacing-sm);
                &:hover{
                    background-color: var(--color-neutral-mid);
                    border-radius: var(--border-radius-sm);
                }
            }
        }
        
        a{
            display: flex;
            gap: var(--spacing-md);
            .image-wrapper{
                width: 12rem;
            }
        }
    }
</style>