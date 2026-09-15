<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Prevpage from "$lib/components/Prevpage.svelte";
    import Heading from "$lib/components/Heading.svelte";
    import GroupView from "$lib/components/GroupView.svelte";
    import YearCards from "$lib/components/YearCards.svelte";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import TeacherCarrousel from "$lib/components/TeachersCaroussel.svelte";
    import PersonSquare from "$lib/components/PersonSquare.svelte";
    import Banner from "$lib/components/Banner.svelte";

    let { data } = $props();
    const persons = data.persons;
    const teachers = data.teachers;
    
</script>

<main>
    <TeacherCarrousel {teachers} />

    {#each persons as person}
        <p>{person.name}</p>
    {/each}

    <Dropdown />
    <Banner />
  
    <Prevpage url="/terug" text="terug" />
    <Heading level={4} text="Groups" />
    <GroupView {persons} />
    <YearCards />
</main>

<style>

</style>
