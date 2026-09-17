<script>
    import SearchBar from "$lib/components/SearchBar.svelte";
    import Heading from "$lib/components/Heading.svelte";

    let { data } = $props();
</script>

<main>
    <Heading level={2} text="Vind je klasgenoten en docenten." />
    <SearchBar persons={data.persons} />
</main>


<style>
    main{
        margin: var(--spacing-xl);
    }
</style>