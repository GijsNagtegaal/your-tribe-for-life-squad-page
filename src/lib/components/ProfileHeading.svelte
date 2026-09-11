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
   
</style>