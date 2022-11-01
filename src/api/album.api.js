import axios from "../axios"



export const getAlbum = async (id, token) => {
    const album = await  axios.get(`/albums/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
    return album.data;
}

