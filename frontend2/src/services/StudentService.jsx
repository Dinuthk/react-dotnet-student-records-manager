import axios from 'axios';

const API_BASE_URL = 'https://localhost:7047/api/Student';

export const getStudents = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const createStudent = async (student) => {
    try {
        const response = await axios.post(API_BASE_URL, student);
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
};

export const updateStudent = async (id, student) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, student);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};