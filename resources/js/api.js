import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.APP_URL,
    withCredentials: true,
});

export default apiClient;
