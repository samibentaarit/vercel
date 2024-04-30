import axios from "axios";

const url = "http://localhost:4000/api/lesson";
export const getAllLessons = async () => {   
    return await axios.get(`${url}/get`);   
};

export const getLesson = async (id) => {
    return await axios.get(`${url}/get/${id}`);
};
export const updateLesson = async (id, lesson) => {
    return await axios.put(`${url}/update/${id}`, lesson);
};
export const deleteLesson = async (id) => {
    return await axios.delete(`${url}/delete/${id}`);
};
export const createLesson = async (lesson) => {
    return await axios.post(`${url}/create`, lesson);
};
export const getLessons = async () => {
    return await axios.get(`${url}/gett`);
};