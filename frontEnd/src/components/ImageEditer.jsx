import React, { useState } from 'react';
import imageService from '../services/imageService';
import { Failed, Success } from '../helpers/popup';

const ImageEditor = ({ image, setUserImages, userImages,setEditingImage }) => {
  const [title, setTitle] = useState(image.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await imageService.editImage(image._id, { title });
      setSuccess('Title updated successfully!');
      Success('Updation Successfull')
      setUserImages(userImages.map(img => img._id === image._id ? { ...img, title } : img));
      setEditingImage(null)
    } catch (error) {
      setError('Edit failed. Please try again.');
      Failed('Updation Failed')
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await imageService.deleteImage(image._id);
      setSuccess('Image deleted successfully!');
      Success('Image Deleted Successfully')
      setUserImages(userImages.filter(img => img._id !== image._id));
      setEditingImage(null)
    } catch (error) {
      setError('Delete failed. Please try again.');
      Failed('Image Delete Failed')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white  shadow-md absolute z-50 top-0 w-full">
      <div className="max-w-full h-[375px] overflow-hidden mb-4 rounded">
  <img 
    src={image.imageUrl} 
    alt={image.title} 
    className="w-full h-full object-contain"
  />
</div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-2" 
          required 
        />
        <button 
          type="submit" 
          className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'} `}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button 
        onClick={handleDelete} 
        className="w-full p-2 bg-red-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default ImageEditor;
