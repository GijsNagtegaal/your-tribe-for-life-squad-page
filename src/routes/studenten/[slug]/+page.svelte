<script>
    import Prevpage from "$lib/components/Prevpage.svelte";
    import ProfileImage from "$lib/components/ProfileImage.svelte";
    import ProfileHeading from "$lib/components/ProfileHeading.svelte";
    import ProfileDetails from "$lib/components/ProfileDetails.svelte";
    import ProfileLinks from "$lib/components/ProfileLinks.svelte";
    import ProfileWidgets from "$lib/components/ProfileWidgets.svelte";

    let { data } = $props();
    let person = $derived(data.person);
</script>
<main>
    <Prevpage />
    <ProfileImage {person} />
    <ProfileHeading {person} />
    <ProfileDetails {person} />
    <ProfileLinks {person} />
    <ProfileWidgets {person} />
</main>


<style>
    main {
        margin: 1rem;
        padding-bottom: 9rem;
    }
</style>    