import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

export const profileUpdates = async(data) => {
    try {
        const response = await API.post('/user/profile-update', data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.warn('API Error ', error);
        const message = error.response?.data || "Something went wrong";
        return message;
    }
    
};

export const profileDelete = async() => {
    try {
        const response = await API.delete('/user/delete-account');
        // console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.warn('API Error ', error);
    }
}

// Generate API key.
export const generateApiKey = async () => {
    try {
        const response = await API.get('/user/generate-key');
        return response.data;
    } catch (error) {
        console.warn('API Error ', error);
    }
}