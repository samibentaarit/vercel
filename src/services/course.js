import axios from "axios";

const url = "http://localhost:4000/api/course";

export const getAllcourses = async () => {   
    return await axios.get(`${url}/get`);   
};
export const addCourse = async (formData) => {
  return await axios.post(`${url}/create`, formData, {
  });
  
};
export const deleteCourse = async (id) => {
 return await axios.delete(`${url}/delete/${id}`);     
 };
 export const editCourse= async (id, course) => {
return await axios.put(`${url}/update/${id}`, course);
    };
    export const getcourse = async (id) => {   
      return await axios.get(`${url}/show/${id}`);   
  };