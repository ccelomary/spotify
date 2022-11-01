import axios from "../axios"


export const getPlaylistById = async ({id, token}) => {
    const playlist = await axios.get('playlists/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return playlist.data;
}

