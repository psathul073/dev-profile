import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

export const FetchProjects = async (nextCursor) => {
    try {
        const response = await API.get('/project/get', {
            params: {
                limit: 5,
                startAfter: nextCursor,
            },
        });

        // console.log(response.data, 'projects--');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

export const FetchSingleProject = async (projectID) => {
    // console.log(projectID, 'project id');

    try {
        const response = await API.get('/project/single', {
            params: { projectID },
        });

        // console.log(response.data, 'single projects--');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};


// Fetch profile for public.
export const FetchProfileForPublic = async (username) => {
    try {
        const response = await API.get('/project/public-profile', {
            params: { username },
        });

        // console.log(response.data, 'profile for public --');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

// Fetch all projects for public.
export const FetchProjectsForPublic = async (username, nextCursor) => {
    try {
        const response = await API.get('/project/public-all', {
            params: {
                username, 
                limit: 5,
                startAfter: nextCursor,
            },
        });

        // console.log(response.data, 'projects for public --');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

// Fetch single project for public.
export const FetchProjectForPublic = async (username, projectID) => {
    try {
        const response = await API.get('/project/public-single', {
            params: { username, projectID },
        });

        // console.log(response.data, 'single projects for public --');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

