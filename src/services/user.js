import axios from "axios";
const url = "http://localhost:4000/user/users";

export const getAllUsers = async () => {
  return await axios.get(`${url}/getAllUsers`);
};
