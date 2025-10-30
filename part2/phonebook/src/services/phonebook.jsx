import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addNew = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  addNew,
  deleteItem,
};
