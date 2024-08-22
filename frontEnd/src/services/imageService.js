import axios from 'axios';

const API_URL = 'https://stockimage-platform-1.onrender.com/api/v1/image/';



const uploadImages = async (imagesData) => { 
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL + 'upload', imagesData, config);
  return response.data;
};

const getImages=async()=>{
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + 'getImages', config);
  return response.data;
}

const rearrangeImages = async (imageOrder) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + 'rearrange', { imageOrder }, config);
  return response.data;
};

const editImage = async (id, updatedData) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + `edit/${id}`, updatedData, config);
  return response.data;
};

const deleteImage = async (id) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + `delete/${id}`, config);
  return response.data;
};

export default {
  uploadImages,
  rearrangeImages,
  editImage,
  deleteImage,
  getImages
};
