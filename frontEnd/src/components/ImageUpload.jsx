import React, { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import imageService from '../services/imageService';
import { useImageContext } from '../context/imageContext';
import { Failed, Success } from '../helpers/popup';
import { app } from '../firebase/firebase';

const MAX_SIZE = 10 * 1024 * 1024; // 2 MB

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { setUserImages } = useImageContext();
  const storage = getStorage(app);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= MAX_SIZE);

    if (validFiles.length < files.length) {
      Failed('Some files were too large and were not added.');
    }

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setTitles((prevTitles) => [...prevTitles, ...new Array(validFiles.length).fill('')]);
  };

  const handleTitleChange = (e, index) => {
    const newTitles = [...titles];
    newTitles[index] = e.target.value;
    setTitles(newTitles);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newTitles = titles.filter((_, i) => i !== index);
    
    URL.revokeObjectURL(images[index].preview); // Revoke the object URL
    setImages(newImages);
    setTitles(newTitles);
  };

  const handleSubmit = async (e) => {
    console.log('dfsf:',process.env.VITE_FIREBASE_API_KEY)
    e.preventDefault();
    setUploading(true);

    if (titles.some(title => !title.trim())) {
      Failed('Please provide valid titles for all images.');
      setUploading(false);
      return;
    }

    const uploadPromises = images.map(async (image, index) => {
      const fileName = `${new Date().getTime()}_${image.file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      await uploadBytes(storageRef, image.file);
      const url = await getDownloadURL(storageRef);
      return { url, title: titles[index] };
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      const res = await imageService.uploadImages(uploadedImages);
      setUserImages(res.userImages);
      setImages([]);
      setTitles([]);
      e.target.reset();
      Success('Images uploaded successfully');
    } catch (error) {
      Failed(error.response?.data?.message || 'Upload failed');
      console.log('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md pt-[118px]">
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        required 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {images.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Selected Images</p>
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img 
                  src={image.preview} 
                  alt={`preview-${index}`} 
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveImage(index)} 
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {images.map((image, index) => (
        <div key={index} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Title for {image.file.name}</label>
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
        disabled={uploading || images.length === 0}
        className={`mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${uploading || images.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default ImageUpload;
