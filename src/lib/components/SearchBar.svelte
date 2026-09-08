<script>
    import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
    let { persons } = $props();
</script>

<header>
    <h2>Vind je klasgenoten en docenten.</h2>
    <search>
        <form>
            <label for="">
                <SearchIcon size="2rem" />
                <input type="search" placeholder="Wie wil je opzoeken?">
            </label>
        </form>
    </search>
</header>

<style>
    form{
        display: flex;
        flex-direction: column;
    }
    label{
        display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		border: 0.15rem solid var(--color-neutral-darker);
		border-radius: var(--border-radius-3xl);
		background-color: var(--color-neutral-darker);

        &:hover, &:focus-within{
            border-color: var(--color-neutral-lighter);
        }
    }
    input{
        border: none;
        background: none;
        outline: none;
        width: 100%;
    }
    input::placeholder{
        font-size: var(--font-size-body-md);
        font-family: var(--font-primary);
    }
</style>