import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Allow cookies & sessions to be sent
});


export const FetchUser = async () => {
    try {
        const response = await API.get('/auth/user');
        // console.log(response.data, '==google');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }

};

export const LogoutUser = async () => {
try {
    const response = await API.get('/auth/logout');
    return response.data;
    
} catch (err) {
    console.warn('API fetching failed', err);
    return null;
}
}