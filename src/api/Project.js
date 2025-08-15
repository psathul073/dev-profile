import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true, // Allow cookies & sessions to be sent
});

// Add project API. ☑️
export const UploadProject = async (data) => {
    try {
        const response = await API.post('/project/add', data);
        //  console.log(response.data, '--project add');
        return response.data;
    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }

};

// Update project API. ☑️
export const UpdateProject = async (data) => {
    try {
        const response = await API.put('/project/update', data);
        // console.log(response.data, '--project add');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }

};

// Delete project API. ☑️
export const DeleteProject = async (projectID, pictureID) => {
    try {
        const response = await API.delete('/project/delete', {
            params: {
                projectID,
                pictureID
            }
        });

        // console.log(response.data, 'delete response');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

// Project to public ☑️
export const ProjectToPublic = async (projectID) => {
    try {
        const response = await API.put('/project/public', {}, {
            params: {
                projectID,
            }
        });

        // console.log(response.data, 'delete response');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};

// Project to private ☑️
export const ProjectToPrivate = async (projectID) => {

    try {
        const response = await API.put('/project/private', {}, {
            params: {
                projectID,
            }
        });

        // console.log(response.data, 'delete response');
        return response.data;

    } catch (err) {
        console.warn('API fetching failed', err);
        return null;
    }
};