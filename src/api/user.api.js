import axios from "../axios";

const fetchUserData = async (token) => {
    const userData = await axios.get('/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
    return {
        id: userData.data.id,
        name: userData.data.display_name,
        image: userData.data.images[0].url || null
    }
}

const fetchUserRecentTracks = async (token) => {
    const userRecentTracks = await axios.get('/me/player/recently-played?limit=20', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
    const removeDuplicates = (arra) => {
        let obj = {};
        for (let i = 0; i < arra.length; i++) {
            obj[arra[i].track['id']] = arra[i];
        }
        arra = new Array();
        for (let key in obj) {
            arra.push(obj[key]);
        }
        return arra;
    }
    return removeDuplicates(userRecentTracks.data.items);
}

const fetchUserCurrentTrack = async (token) => {
    const  userCurrentTrack = await axios.get('/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
    }});
    if (typeof userCurrentTrack.data === 'string')
        return {};
    return {
        uri: userCurrentTrack.data.item.uri,
        id: userCurrentTrack.data.item.id,
    }
}


const fetchUserPlaylists = async (token) => {
    const userPlaylists = await axios.get('/me/playlists', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
    }});
    return userPlaylists.data.items.map((item) => {
        return {
            id: item.id,
            name: item.name,
            image: item.images.length > 0 ? item.images[0].url : null,
            owner: item.owner.display_name,
            external_url: item.external_urls.spotify,
            uri: item.uri,
            total: item.tracks.total
        }
    })
}



export {
    fetchUserData,
    fetchUserRecentTracks,
    fetchUserCurrentTrack,
    fetchUserPlaylists
}
