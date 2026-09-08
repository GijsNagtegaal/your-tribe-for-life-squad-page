<script>
    import Player from "./Player.svelte";
    import Seperator from "./icons/Seperator.svelte";
</script>

<section>
    <header> 
        <p>Playlist</p>
        <Seperator />
        <p>40 nummers</p>
    </header>

    <a href="/">
        Delen
    </a>

    <div> <!-- dit mag want het is puur decoratief -->
        <Player />
    </div>
</section>

<style>
    section {
        display: grid;
        width: 100%;
        min-height: 40px; 
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
    }
    header {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: row;
    }

    a {
        grid-column: 1;
        grid-row: 2;
    }

    div {
        grid-column: 2;
        grid-row: 1 / span 2;
        display: flex;
        align-items: center; 
    }
</style>