<script>
    //https://svelte.dev/docs/svelte/transition
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate'
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
                    <li animate:flip>
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
            <p>Geen zoekresultaten gevonden voor "{searchTerm}"</p>
        {/if}
    </section>
    {:else}
    <p>Typ een naam om te zoeken</p>
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
        padding: var(--spacing-md) var(--spacing-xl);
        border-radius: var(--border-radius-xl);
        margin-top: var(--spacing-xs);
        
        h3{
            margin-top: var(--spacing-md);
            color: var(--color-neutral-lightest);
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