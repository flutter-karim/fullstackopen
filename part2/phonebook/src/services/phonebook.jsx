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

const updateItem = (newObject) => {
  return axios.put(`${baseUrl}/${parseInt(newObject.id)}`, newObject);
};

export default {
  getAll,
  addNew,
  deleteItem,
  updateItem,
};
