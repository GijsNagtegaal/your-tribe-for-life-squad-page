<script>
    import Prevpage from '$lib/components/Prevpage.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import ProfileImage from '$lib/components/ProfileImage.svelte'
    import ProfileHeading from '$lib/components/ProfileHeading.svelte'

    let { data } = $props();
    const students = data.students;

</script>

<Prevpage />
<Dropdown />

<ul>
    {#each students as student}
        <li>
            <ProfileImage person={student} />
            <h4>{student.name}</h4>
        </li>
    {/each}
</ul>

<style>
    ul{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0, 200px));
        row-gap: var(--spacing-md);
        padding: 0;
        margin: 0 auto;
        max-width: 1000px;
        li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            h4{
                padding: var(--spacing-md);
            }
        }
    }
    
</style>