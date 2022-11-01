import axios from "../axios";

export const getLikedSongs = async ({owner, token}) => {
    const likedSongs = await axios.get('me/tracks', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return {
        images: [{
            url: 'https://source.unsplash.com/fAo2v4hu5Mk'
        }],
        type: 'Playlist',
        name: 'Liked Songs',
        id: 'liked_songs',
        owner,
        tracks: {
            total:likedSongs.data.total,
            items:likedSongs.data.items
        }
    }
}

export const getUserSavedAlbums = async ({token}) => {
    const savedAlbums = await axios.get('me/albums', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return savedAlbums.data.items;
}