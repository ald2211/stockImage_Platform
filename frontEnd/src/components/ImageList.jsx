import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import imageService from '../services/imageService';
import { useImageContext } from '../context/imageContext';
import ImageEditor from './ImageEditer';
import { Failed, Success } from '../helpers/popup';


const ImageList = () => {
  const { userImages, setUserImages } = useImageContext();
  const [editingImage, setEditingImage] = useState(null); 

  useEffect(() => {
    const fetchImages = async () => {
      const res = await imageService.getImages();
      setUserImages(res.allImages);
    };
    fetchImages();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(userImages);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setUserImages(reorderedImages);

    const imageOrder = reorderedImages.map((image) => image._id);
    imageService.rearrangeImages(imageOrder).catch(error => console.error('Rearrangement failed:', error));
  };

  const handleEdit = (image) => {
    setEditingImage(image);
  };

  const handleDelete = (image) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    imageService.deleteImage(image._id)
      .then(() => {
        setUserImages(userImages.filter(img => img._id !== image._id));
        setEditingImage(null); // Hide the editor after deletion
        Success('Image removed successfully')
      })
      .catch(error => Failed('Delete action Failed'));
  };

  return (
    <div>
      {editingImage && (
        <ImageEditor 
          image={editingImage}
          setUserImages={setUserImages}
          setEditingImage={setEditingImage}
          userImages={userImages}
        />
      )}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ROOT" direction="horizontal" type="DEFAULT">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-5"
            >
              {userImages.map((image, index) => (
                <Draggable key={image._id} draggableId={image._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative bg-white rounded-lg shadow-md overflow-hidden group"
                    >
                      <div className="w-full h-auto flex justify-center items-center overflow-hidden">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title} 
                          className="max-w-full max-h-60 object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-semibold text-gray-900">{image.title}</p>
                      </div>
                      {/* Edit and Delete Icons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-2">
                        <button
                          onClick={() => handleEdit(image)}
                          className="text-blue-500 hover:text-blue-900"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(image)}
                          className="text-red-500 hover:text-red-900"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageList;
