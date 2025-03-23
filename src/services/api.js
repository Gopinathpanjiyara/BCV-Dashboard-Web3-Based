import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const uploadCandidate = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/candidates/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCandidates = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/candidates/`, {
            params: {
                skip: (page - 1) * limit,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
