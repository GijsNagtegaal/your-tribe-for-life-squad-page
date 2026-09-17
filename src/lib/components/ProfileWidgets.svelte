<script>
    import Miniplayer from "./Miniplayer.svelte";
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PlayingIconV2 from "./icons/PlayingIconV2.svelte";

    let { person } = $props();

    let audioElements = $state([]);
    let currentTimes = $state([]);
    let durations = $state([]);
    let currentTrackIndex = $state(null);
    let isPlaying = $state(false);

    function toggleAudio(index) {
        const selectedAudio = audioElements[index];
        if (!selectedAudio) return;

        if (currentTrackIndex !== null && currentTrackIndex !== index) {
            audioElements[currentTrackIndex].pause();
        }

        currentTrackIndex = index;

        if (selectedAudio.paused) {
            selectedAudio.play();
            isPlaying = true;
        } else {
            selectedAudio.pause();
            isPlaying = false;
        }
    }

    function toggleFavoriteSong() {
        if (currentTrackIndex === null) {
            toggleAudio(0);
        } else {
            toggleAudio(currentTrackIndex);
        }
    }

    function stopFavoriteSong() {
        isPlaying = false;
        currentTrackIndex = null;
    }
</script>

{#if person}
    <section>
        <h4>Favoriete</h4>
        <ul>
            <li class="favorite-card hobby-card" style="--widget-color: #91a653">
                <h4>Hobby</h4>
                <p>{person?.fav_hobby || "Onbekend"}</p>
                <span class="card-emoji">🧩</span>
            </li>
            <li class="favorite-card emoji-card" style="--widget-color: #293d78">
                <h4>Emoji</h4>
                <span class="card-emoji">{person?.fav_emoji || "🙂"}</span>
            </li>
            <li class="favorite-card residency-card" style="--widget-color: #649958">
                <h4>Woonplaats</h4>
                <p>{person?.residency || "Onbekend"}</p>
                <span class="card-emoji">📍</span>
            </li>
            <li class="favorite-card song-card" style="--widget-color: #8c6bad">
                <h4>Liedje</h4>
                <p class="song-name">{person?.spotifyData?.name || person?.fav_song || "Onbekend"}</p>
                {#if person?.audioUrl}
                    <button
                        class="song-control"
                        data-playing={currentTrackIndex === 0}
                        onclick={() => toggleAudio(0)}
                        aria-label={isPlaying ? "Pauzeer liedje" : "Speel liedje"}>
                        <i data-active={isPlaying}>
                            <PlayingIconV2 color="#1d1d20" />
                        </i>
                        <i data-active={!isPlaying}>
                            <PlayIcon size="2rem" />
                        </i>
                    </button>
                    <audio
                        bind:this={audioElements[0]}
                        bind:currentTime={currentTimes[0]}
                        bind:duration={durations[0]}
                        src={person.audioUrl}
                        onended={stopFavoriteSong}
                    ></audio>
                {/if}
            </li>
        </ul>
    </section>

    {#if person?.audioUrl && (person?.spotifyData?.name || person?.fav_song) && currentTrackIndex !== null}
        <Miniplayer
            songName={person.spotifyData?.name || person.fav_song}
            artist={person.spotifyData?.artist}
            mugshot={person.mugshot}
            favcolor={person.fav_color}
            currentTime={currentTimes[currentTrackIndex] || 0}
            duration={durations[currentTrackIndex] || 0}
            {isPlaying}
            togglePlayback={toggleFavoriteSong}
        />
    {/if}
{/if}

<style>
    section {
        width: min(100%, 700px);
        margin: var(--spacing-lg) auto 0;

        h4 {
            margin: 0 0 var(--spacing-md);
        }

        ul {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                min-width: 0;
                border-radius: var(--border-radius-sm);
            }

            p {
                margin-top: var(--spacing-sm);
                font-size: var(--font-size-body);
                font-weight: var(--font-weight-medium);
            }

            .card-emoji {
                position: absolute;
                right: var(--spacing-md);
                bottom: var(--spacing-md);
                font-size: 2rem;
            }
        }
    }

    .favorite-card {
        position: relative;
        min-height: 170px;
        overflow: hidden;
        padding: var(--spacing-md);
        background: var(--widget-color);

        &::before {
            position: absolute;
            right: -10px;
            bottom: 0px;
            width: 100px;
            height: 80px;
            transform: rotate(20deg);
            background: #1d1d20;
            box-shadow: 0 2px 8px rgb(0 0 0 / 25%);
            content: "";
        }
    }

    .song-control {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: var(--spacing-md);
        bottom: var(--spacing-md);
        width: 3.5rem;
        height: 3.5rem;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: var(--border-radius-circle);
        background: var(--color-brand-mid);
        color: var(--text-inverted);
        cursor: pointer;

        i {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
            transition:
                transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            font-style: normal;

            &[data-active="true"] {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
        }
    }

    @media (min-width: 420px) {
        section ul {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
