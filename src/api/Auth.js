import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

export const FetchUser = async () => {
    try {
        const response = await API.get('/u/user-data');
        return response.data;

    } catch (err) {
        console.error('API fetching failed', err);
        return err.response?.data || 'API fetching failed';
    }

};

export const LogoutUser = async () => {
    try {
        const response = await API.get('/u/logout');
        return response.data;

    } catch (err) {
        console.error('API fetching failed', err);
        return err.response?.data || 'API fetching failed';
    }
};