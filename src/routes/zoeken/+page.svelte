<script>
    import SearchBar from "$lib/components/SearchBar.svelte";

    let { data } = $props();
</script>

<SearchBar persons={data.persons} />


<style>

</style>