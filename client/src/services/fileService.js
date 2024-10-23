import ApiClient from '../api/apiClient';

export const fetchFiles = async () => {
  const response = await ApiClient.get('/user/files');
  return response.data.message;
};