import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addNew = (newObject) => {
  return axios.post(baseUrl, newObject);
};

export default {
  getAll,
  addNew,
};
