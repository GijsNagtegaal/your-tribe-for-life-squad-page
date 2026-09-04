<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Prevpage from "$lib/components/Prevpage.svelte";

    let { data } = $props();
    let { person } = data;
</script>
<main>
    <Prevpage />
    <section>
        <img src="https://fdnd.directus.app/assets/{person.mugshot}" alt="">
    </section>
</main>


<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 30vw;
        height: 30vw;
        max-width: 8rem;
        max-height: 8rem;
        object-fit: cover;
        border-radius: var(--border-radius-circle);
        border: 1px solid var(--text);
    }
</style>