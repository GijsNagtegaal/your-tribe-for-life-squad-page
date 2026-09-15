export async function load({ fetch, params }) {
    const [res, playlistRes] = await Promise.all([
        fetch("https://fdnd.directus.app/items/person?fields=*&filter[squads][squad_id][cohort][_eq]=2627"),
        fetch("https://api.gijsnagtegaal.nl/items/school")
    ]);
    const data = await res.json();
    const playlistData = await playlistRes.json();
    const playlistItems = Array.isArray(playlistData)
        ? playlistData
        : playlistData.data || [playlistData];

    const matchedPerson = data.data.find(person => {
        if (!person.name) return false;

        const slug = person.name.toLowerCase().replaceAll(" ", "-");
        return slug === params.slug;
    });

    const playlistPerson = playlistItems.find(item =>
        item.name?.toLowerCase() === matchedPerson?.name?.toLowerCase()
    );

    return {
        person: matchedPerson
            ? {
                  ...matchedPerson,
                  audioUrl: playlistPerson?.audio_file
                      ? `https://api.gijsnagtegaal.nl/assets/${playlistPerson.audio_file}`
                      : null,
                  spotifyData: playlistPerson?.song_name
                      ? {
                            name: playlistPerson.song_name,
                            artist: playlistPerson.artist_name
                        }
                      : null
              }
            : null
    };
}
