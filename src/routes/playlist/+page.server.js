export async function load() {

    // fetch the fdnd and my own endpoint in parralel for fast loading
    const [fdndRes, playlistRes] = await Promise.all([
        fetch("https://fdnd.directus.app/items/person?fields=name,mugshot&filter[squads][squad_id][cohort][_eq]=2627"),
        fetch("https://api.gijsnagtegaal.nl/items/school")
    ]);

    // assign all data to a const
    const fdndData = await fdndRes.json();
    const playlistData = await playlistRes.json();
    
    const playlistItems = Array.isArray(playlistData) ? playlistData : playlistData.data || [playlistData];

    const mugshotsMap = new Map(
        fdndData.data.map(person => [person.name?.toLowerCase(), person.mugshot])
    );

    const persons = playlistItems.map(person => {
        const slug = person.name 
            ? person.name.toLowerCase().replaceAll(' ', '-') 
            : 'unknown';

        // return all data needed for the playlist page, not any more as i filtered the fetch to be as efficient as possible :)
        return {
            ...person,
            slug,
            mugshot: mugshotsMap.get(person.name?.toLowerCase()) || null,
            audioUrl: person.audio_file ? `https://api.gijsnagtegaal.nl/assets/${person.audio_file}` : null,
            spotifyData: person.song_name ? {
                name: person.song_name,
                artist: person.artist_name
            } : null
        };
    });

    return { persons };
}