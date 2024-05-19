import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((resp) => resp.data);
};
const create = (newObj) => {
  const req = axios.post(baseUrl, newObj);
  return req.then((resp) => resp.data);
};
const removeEntry = (id) => {
  const req = axios.delete(baseUrl + `/${id}`);
  return req.then((resp) => resp.data);
};
const updateEntry = (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj);
  return req.then((resp) => resp.data);
};
export default { getAll, create, removeEntry, updateEntry };
