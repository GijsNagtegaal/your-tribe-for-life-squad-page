<script>

    let {data} = $props();

    const persons = data.persons;

    import Navbar from "$lib/components/Navbar.svelte";
    import Player from "$lib/components/Player.svelte";
    import Prevpage from "$lib/components/Prevpage.svelte";
    import Heading from "$lib/components/Heading.svelte";
    import GroupView from "$lib/components/GroupView.svelte";
    import YearCards from "$lib/components/YearCards.svelte";
</script>
<main>
    <Prevpage url="/terug" text="terug" />
    <Navbar />
    <Heading level={4} text="Groups" />
    <GroupView />
    <YearCards {persons} />
</main>

<Player />
<Navbar />


<style>
    
</style>
