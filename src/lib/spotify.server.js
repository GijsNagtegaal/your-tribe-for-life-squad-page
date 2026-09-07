import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

let cachedToken = null;
const spotifyCache = new Map();

export function extractTrackId(url) {
	if (!url) return null;
	const match = url.match(/track\/([a-zA-Z0-9]+)/);
	return match ? match[1] : null;
}

export async function getSpotifyData(trackUrl) {
	const trackId = extractTrackId(trackUrl);
	if (!trackId) {
		return { artist: '', name: '' };
	}

	if (spotifyCache.has(trackId)) {
		return spotifyCache.get(trackId);
	}

	try {
		if (!cachedToken) {
			const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
				},
				body: 'grant_type=client_credentials'
			});
			const tokenData = await tokenResponse.json();
			cachedToken = tokenData.access_token;
		}

		const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${cachedToken}`
			}
		});

		const trackData = await trackResponse.json();

		if (!trackData || !trackData.artists) {
			return { artist: '', name: '' };
		}

		const result = {
			artist: trackData.artists.map(artist => artist.name).join(', '),
			name: trackData.name
		};

		spotifyCache.set(trackId, result);
		return result;
	} catch (error) {
		console.error('Error fetching Spotify data:', error);
		return { artist: '', name: '' };
	}
}