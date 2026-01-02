import axios from 'axios';

const API = axios.create({
    baseURL: "https://api.github.com/repos/",
    headers: { "Content-Type": "application/json" },
    withCredentials: false, // Allow cookies & sessions to be sent
});

export const FetchRepo = async(data) => {
    try {
        const response = await API.get(`${data?.ghUsername}/${data?.repoName}`);
        // console.log(response.data, '==Repo data');
        return response.data;

    } catch (err) {
        console.error('Github repo fetch error:', err);
        return err.response?.data || "Github repo fetching error.";
    }

};
