import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

export const FetchProjects = async (nextCursor, limit = 5, searchTerm) => {
    try {
        const response = await API.get('/p/get', {
            params: {
                limit: limit,
                startAfter: nextCursor,
                searchTerm: searchTerm.trim(),
            },
        });

        // console.log(response.data, 'projects--');
        return response.data;

    } catch (err) {
        console.error('Fetch all projects error:', err);
        return err.response?.data || "Projects fetch error.";
    }
};

export const FetchSingleProject = async (projectID) => {
    // console.log(projectID, 'project id');

    try {
        const response = await API.get('/p/single', {
            params: { projectID },
        });

        // console.log(response.data, 'single projects--');
        return response.data;

    } catch (err) {
        console.error('Fetch single project error:', err);
        return err.response?.data || "Project fetch error.";
    }
};

// Fetch total like and projects count.
export const FetchCounts = async () => {
    try {
        const response = await API.get('/p/counts');

        // console.log(response.data, 'single projects--');
        return response.data;

    } catch (err) {
        console.error('Fetch counts error:', err);
        return err.response?.data || "Fetch counts error.";
    }
};

// Fetch all projects for public.
export const FetchProjectsForPublic = async (username, nextCursor) => {
    try {
        const response = await API.get('/p/public-all', {
            params: {
                username, 
                limit: 5,
                startAfter: nextCursor,
            },
        });

        // console.log(response.data, 'projects for public --');
        return response.data;

    } catch (err) {
        console.error('Fetch all public projects error:', err);
        return err.response?.data || "Fetch public projects error.";
    }
};

// Fetch single project for public.
export const FetchProjectForPublic = async (username, projectID) => {
    try {
        const response = await API.get('/p/public-single', {
            params: { username, projectID },
        });

        // console.log(response.data, 'single projects for public --');
        return response.data;

    } catch (err) {
        console.error('Fetch public project error:', err);
        return err.response?.data || "Fetch public project error";
    }
};

