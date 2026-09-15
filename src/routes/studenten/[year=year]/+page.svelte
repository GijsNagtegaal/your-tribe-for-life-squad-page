<script>
    import Prevpage from '$lib/components/Prevpage.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import PersonList from '$lib/components/PersonList.svelte';

    let { data } = $props();
    const students = data.students;
</script>

<Prevpage />
<Dropdown />
<PersonList persons={students} />
