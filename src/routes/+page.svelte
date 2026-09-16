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
    <Dropdown />
    <Banner />
    <Heading level={3} text="Leerjaren" />
    <YearCards />
    <Heading level={3} text="Groups" />
    <GroupView {persons} />
</main>

<style>
    main {
        margin: 1rem;
    }
</style>
