import axios from '../axios';

export const fetchSearch = async (token, query) => {
    const response = await axios.get(`/search?q=${query}&type=track,album,playlist`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    return response.data;
}