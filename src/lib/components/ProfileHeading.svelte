<script>
     let { person } = $props();
     const invalidBioCharacters = /[<?>{}]/;

     console.log(person);
     
</script>

    
<section>
    {#if person }
        <h4>{person?.name}</h4>

        {#if person?.bio && !invalidBioCharacters.test(person.bio)}
            <p>{person.bio}</p>
        {:else}
            <p>Geen bio beschikbaar</p>
        {/if}
    {:else}
        <h4>Onbekend persoon</h4>
        <p>ga terug en kies een persoon...</p>  
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-md);

        p {
            margin: 7px auto 0;
            font-size: var(--font-size-body-xs);
            text-align: center;
            width: auto;
        }

        @media (min-width: 368px) {
            p {
                width: 60vw;
            }
        }
    }
</style>