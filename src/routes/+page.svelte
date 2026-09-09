<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Prevpage from "$lib/components/Prevpage.svelte";
    import Heading from "$lib/components/Heading.svelte";
    import GroupView from "$lib/components/GroupView.svelte";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import PersonSquare from "$lib/components/PersonSquare.svelte";
    
    let { data } = $props();
    const persons = data.persons;
    
</script>

<main>
    {#each persons as person}
        <p>{person.name}</p>
    {/each}
    <Dropdown />
    <Prevpage url="/terug" text="terug" />
    <Navbar />
    <Heading level={4} text="Groups" />
    <GroupView {persons} />
    
</main>
<Navbar />

<style>

</style>
