<script>
    import SearchBar from "$lib/components/SearchBar.svelte";

    let { data } = $props();
</script>

<h2>Vind je klasgenoten en docenten.</h2>
<SearchBar persons={data.persons} />

<!--hier komt Recente zoekresultaten van thomas-->