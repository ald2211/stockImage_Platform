import axios from 'axios';

const API_URL = 'https://stockimage-platform.onrender.com/api/v1/user/';

const resetUserPassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const response = await axios.patch(API_URL + 'resetPassword', passwordData, config);
  return response.data;
};

export default {
  resetUserPassword
};
