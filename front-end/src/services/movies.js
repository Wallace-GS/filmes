import axios from 'axios';
const baseUrl = '/api/movies';

export const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};
