<script>
    let { level = 1, text = '' } = $props();
</script>

<svelte:element class="heading" this={`h${level}`}>
    {text}
</svelte:element>

<style>
    .heading {
        margin: 1rem 0
    }
</style>