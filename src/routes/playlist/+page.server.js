export async function load() {
	const res = await fetch('https://api.gijsnagtegaal.nl/items/school');
	const data = await res.json();

	const persons = Array.isArray(data) ? data : data.data || [data];

	return {
		persons: persons.map((person) => ({
			...person,
			slug: person.name?.toLowerCase().replaceAll(' ', '-') || 'unknown',
			audioUrl: `https://api.gijsnagtegaal.nl/assets/${person.audio_file}`,
			spotifyData: {
				name: person.song_name,
				artist: person.artist_name
			}
		}))
	};
}