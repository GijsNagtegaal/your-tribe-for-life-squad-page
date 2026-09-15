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

<main style="--fav-color: {person?.fav_color || 'transparent'};">
    <Prevpage />
    <ProfileImage {person} />
    <ProfileHeading {person} />
    <ProfileDetails {person} isTeacher={true} />
    <ProfileLinks {person} />
    <ProfileWidgets {person} />
</main>


<style>
    main {
        padding: 1rem;
        padding-bottom: 9rem;
        min-height: 100vh;
        
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--fav-color) 24%, transparent),
            transparent 60%
        );
    }
</style>    