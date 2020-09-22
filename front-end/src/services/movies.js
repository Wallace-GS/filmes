import axios from 'axios';
const baseUrl = '/api/movies';

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
