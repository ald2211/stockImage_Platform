import React, { useState } from 'react';
import imageService from '../services/imageService';
import { useImageContext } from '../context/imageContext';
import { Failed, Success } from '../helpers/popup';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);
  const { setUserImages } = useImageContext();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setTitles(new Array(files.length).fill('')); 
  };

  const handleTitleChange = (e, index) => {
    const newTitles = [...titles];
    newTitles[index] = e.target.value;
    setTitles(newTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    images.forEach((image, index) => {
      formData.append('images', image);
  
      const title = titles[index];
      formData.append('titles', Array.isArray(title) ? title : [title]);
    });
  
    try {
      const res = await imageService.uploadImages(formData);
      setUserImages(res.userImages);
      setImages([]);
      setTitles([]);
      e.target.reset(); 
      Success('Image uploaded successfully')
    } catch (error) {
      Failed(error.response.data.message)
      console.log('Upload failed:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md pt-[118px]">
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        required 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {images.map((image, index) => (
        <div key={index} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Title for {image.name}</label>
          <input 
            type="text" 
            value={titles[index]}
            onChange={(e) => handleTitleChange(e, index)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
      <button 
        type="submit" 
        className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;
