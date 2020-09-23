import axios from 'axios';
const baseUrl = '/api/movies';

let token = null;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

export const createMovie = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
