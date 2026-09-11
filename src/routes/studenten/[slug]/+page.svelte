<script>
    import Prevpage from "$lib/components/Prevpage.svelte";
    import ProfileImage from "$lib/components/ProfileImage.svelte";
    import ProfileHeading from "$lib/components/ProfileHeading.svelte";
    import ProfileDetails from "$lib/components/ProfileDetails.svelte";

    let { data } = $props();
    let person = $derived(data.person);
</script>
<main>
    <Prevpage />
    <ProfileImage {person} />
    <ProfileHeading {person} />
    <ProfileDetails {person} />
</main>


<style>
    
</style>    