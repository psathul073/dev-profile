import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

export const profileUpdates = async(data) => {
    try {
        const response = await API.post('/u/profile-update', data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error);
        return error.response?.data || "Something went wrong";;
    }
    
};

export const profileDelete = async() => {
    try {
        const response = await API.delete('/u/delete-account');
        // console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error('Account delete error:', error);
        return error.response?.data || "Something went wrong";;
    }
}

// Fetch profile for public.
export const FetchProfileForPublic = async (username) => {
    try {
        const response = await API.get('/u/public-profile', {
            params: { username },
        });

        // console.log(response.data, 'profile for public --');
        return response.data;

    } catch (error) {
        console.error('Profile fetching error:', error);
        return error.response?.data || "Something went wrong";;
    }
};

// Generate API key.
export const generateApiKey = async () => {
    try {
        const response = await API.get('/u/generate-key');
        return response.data;
    } catch (error) {
        console.error('API key generate error:', error);
        return error.response?.data || "Something went wrong";;
    }
}