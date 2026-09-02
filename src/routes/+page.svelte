<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Player from "$lib/components/Player.svelte";
    import Prevpage from "$lib/components/Prevpage.svelte";
    import Heading from "$lib/components/Heading.svelte";
    import GroupView from "$lib/components/GroupView.svelte";

    let { data } = $props();
    const persons = data.persons;
</script>

<main>
    {#each persons as persons}
        <p>{persons.name}</p>
    {/each}
    <Prevpage url="/terug" text="terug" />
    <Navbar />
    <Heading level={4} text="Groups" />
    <GroupView {persons} />
    <Dropdown />
</main>

<Player />
<Navbar />

<style>

</style>