<script>
    import Miniplayer from "./Miniplayer.svelte";
    import PlayIcon from "./icons/PlayIcon.svelte";
    import PlayingIcon from "./icons/PlayingIcon.svelte";

    let { person } = $props();

    let audioElements = $state([]);
    let currentTimes = $state([]);
    let durations = $state([]);
    let currentTrackIndex = $state(null);
    let isPlaying = $state(false);

    let favoriteWidgets = $derived([
        { label: "Hobby", value: person?.fav_hobby, color: "#91a653" },
        { label: "Emoji", value: person?.fav_emoji, color: "#293d78" },
        { label: "Woonplaats", value: person?.residency, color: "#649958" },
        {
            label: "Liedje",
            value: person?.spotifyData?.name || person?.fav_song,
            color: "#8c6bad",
            song: true,
        },
    ]);

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
            {#each favoriteWidgets as widget}
                <li
                    class="favorite-card"
                    style={`--widget-color: ${widget.color}`}
                >
                    <h4>{widget.label}</h4>
                    {#if widget.song}
                        <p class="song-name">{widget.value || "Onbekend"}</p>
                        {#if person?.audioUrl}
                            <button
                                class="song-control"
                                data-playing={currentTrackIndex === 0}
                                onclick={() => toggleAudio(0)}
                                aria-label={isPlaying
                                    ? "Pauzeer liedje"
                                    : "Speel liedje"}>
                                <i data-active={isPlaying}>
                                    <PlayingIcon color="currentColor" />
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
                    {:else if widget.label === "Hobby"}
                        <p>{widget.value || "Onbekend"}</p>
                        <span class="card-emoji">🧩</span>
                    {:else if widget.label === "Emoji"}
                        <span class="card-emoji">{widget.value || "🙂"}</span>
                    {:else if widget.label === "Woonplaats"}
                        <p>{widget.value || "Onbekend"}</p>
                        <span class="card-emoji">📍</span>
                    {:else}
                        <p>{widget.value || "Onbekend"}</p>
                    {/if}
                </li>
            {/each}
        </ul>
    </section>

    {#if person?.audioUrl && favoriteWidgets[3].value && currentTrackIndex !== null}
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
            right: -28px;
            bottom: -48px;
            width: 130px;
            height: 130px;
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
