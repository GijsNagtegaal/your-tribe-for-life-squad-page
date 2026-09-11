export async function load() {

    // fetch the fdnd and my own endpoint in parallel for fast loading
    const [fdndRes, playlistRes] = await Promise.all([
        fetch("https://fdnd.directus.app/items/person?fields=name,mugshot,fav_color&filter[squads][squad_id][cohort][_eq]=2627"),
        fetch("https://api.gijsnagtegaal.nl/items/school")
    ]);

    // assign all data to a const
    const fdndData = await fdndRes.json();
    const playlistData = await playlistRes.json();
    
    const playlistItems = Array.isArray(playlistData) ? playlistData : playlistData.data || [playlistData];

    const fdndMap = new Map(
        fdndData.data.map(person => [
            person.name?.toLowerCase(), 
            { mugshot: person.mugshot, fav_color: person.fav_color }
        ])
    );

    const persons = playlistItems.map(person => {
        const slug = person.name 
            ? person.name.toLowerCase().replaceAll(' ', '-') 
            : 'unknown';

        const fdndInfo = fdndMap.get(person.name?.toLowerCase()) || {};

        // return all data needed for the playlist page, not any more as i filtered the fetch to be as efficient as possible :)
        return {
            ...person,
            slug,
            mugshot: fdndInfo.mugshot || null,
            fav_color: fdndInfo.fav_color || null,
            audioUrl: person.audio_file ? `https://api.gijsnagtegaal.nl/assets/${person.audio_file}` : null,
            spotifyData: person.song_name ? {
                name: person.song_name,
                artist: person.artist_name
            } : null
        };
    });

    return { persons };
}