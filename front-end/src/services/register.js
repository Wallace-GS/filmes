import axios from 'axios';

const baseUrl = '/api/users';

export const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
