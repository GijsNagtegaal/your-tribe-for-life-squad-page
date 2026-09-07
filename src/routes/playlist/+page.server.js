import { getSpotifyData } from '$lib/spotify.server.js';

export async function load() {
	const res = await fetch(
		"https://fdnd.directus.app/items/person?fields=*&filter[squads][squad_id][cohort][_eq]=2627"
	);
	const data = await res.json();

	const persons = await Promise.all(
		data.data
			.filter(person => person.fav_spotify_track)
			.map(async (person) => {
				const slug = person.name
					? person.name.toLowerCase().replaceAll(' ', '-')
					: 'unknown';

				const spotifyData = await getSpotifyData(person.fav_spotify_track);

				return {
					...person,
					slug,
					spotifyData,
					audioUrl: `src/lib/assets/${person.name?.trim().replaceAll(' ', '-') || 'unknown'}.mp3`
				};
			})
	);

	return { persons };
}