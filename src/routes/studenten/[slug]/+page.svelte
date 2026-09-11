<script>
    import Prevpage from "$lib/components/Prevpage.svelte";
    import ProfileImage from "$lib/components/ProfileImage.svelte";

    let { data } = $props();
    let person = $derived(data.person);
</script>
<main>
    <Prevpage />
    <ProfileImage {person} />
</main>


<style>
    
</style>    