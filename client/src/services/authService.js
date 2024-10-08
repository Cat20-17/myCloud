import ApiClient from '../api/apiClient'

export const register = async (userData) => {
  await ApiClient.post('/auth/register', userData, {})
};

export const login = async (userData) => {
 return await ApiClient.post('/auth/login', userData, {});
};