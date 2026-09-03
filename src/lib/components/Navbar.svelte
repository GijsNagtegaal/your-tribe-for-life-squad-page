<script>
    import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import PlaylistIcon from '$lib/components/icons/PlaylistIcon.svelte';
</script>

<nav>
    <a href="/">
        <HomeIcon size="2em" />
        Home
    </a>
    <a href="/zoeken">
        <SearchIcon size="2em" />
        Zoeken
    </a>
    <a href="/playlist">
        <PlaylistIcon size="2em" />
        Playlist
    </a>
</nav>

<style>

    nav {
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: space-around;
        background: var(--background);
        position: fixed;
        bottom: 0;
        left: 0;

        a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--text);
        }
    }
</style>