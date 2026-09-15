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
        position: relative;
        display: grid;
        /*https://css-tricks.com/books/greatest-css-tricks/flexible-grids/*/
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        row-gap: var(--spacing-md);
        padding: 0;
        margin: 0 auto;
        max-width: 1000px;
        padding: var(--spacing-md);

        li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            h4{
                padding: var(--spacing-md);
            }
        }

        &::before{
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 60vh;
            background: linear-gradient(
                180deg,
                #00667b 0%,
                #002f38 49%,
                #101010 89%
            );
        }
        &::after{
            content: "";
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60vh;
            z-index: 2;
            pointer-events: none;
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.7) 0%,
                rgba(0, 0, 0, 0.47) 49%,
                rgba(0, 0, 0, 0) 89%
            );
        }
    }
   
    
</style>