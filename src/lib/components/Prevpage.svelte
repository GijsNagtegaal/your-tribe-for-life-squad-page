<script>
    let { url = "/", text = "Terug" } = $props();
    import PrevIcon from "$lib/components/icons/PrevIcon.svelte";
</script>

<a href={url}>
    <PrevIcon />
    {text}
</a>

<style>
    a {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }
</style>