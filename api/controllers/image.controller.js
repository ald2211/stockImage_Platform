import Image from '../models/image.model.js';
import { errorHandler } from '../utils/customError.js';



export const addImages = async (req, res, next) => {
  const { imagesData } = req.body; 
  const { user } = req;

  try {
    if (!imagesData || imagesData.length === 0) {
      throw new Error('No image data provided');
    }

    // Process the images array
    const processedImages = imagesData.map((image, index) => ({
      title: image.title,
      imageUrl: image.url,
      user: user.id,
      order: index,
    }));

    // Insert the processed images into the database
    await Image.insertMany(processedImages);

    // Retrieve and return the updated list of images for the user
    const userImages = await Image.find({ user: user.id }).sort({ order: 1 });

    res.json({ msg: 'Images uploaded successfully', userImages });
  } catch (error) {
    console.error('Error during image upload:', error.message);
    next(errorHandler(500, `Server error: ${error.message}`));
  }
};



export const getImages=async (req,res,next)=>{
  try{
    const { user } = req;
    const images = await Image.find({ user: user.id }).sort({ order: 1 });
    if(images){
      res.status(200).json({success:true,allImages:images})
    }
  }catch(err){
    console.log('get err:',err)
    next(500,'server error')
  }
}

export const rearrangeImages = async (req, res,next) => {
  const { imageOrder } = req.body; 
  try {
    for (let i = 0; i < imageOrder.length; i++) {
      await Image.findByIdAndUpdate(imageOrder[i], { order: i });
    }
    res.json({ msg: 'Image order updated' });
  } catch (error) {
    console.log(error);
    next(errorHandler(500,'server error'))
  }
};

export const editImage = async (req, res,next) => {
  const { id } = req.params;
  const { title, newImage } = req.body; // newImage is optional

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }

    image.title = title;
    if (newImage) {
      image.imageUrl = newImage; // Assume the new image is already uploaded and URL provided
    }

    const updatedImage = await image.save();
    res.json({ msg: 'Image updated', image: updatedImage });
  } catch (error) {
    console.log(error.message);
    next(500,'server error')
    
  }
};

export const deleteImage = async (req, res,next) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) next(404,'Image not found');
    await image.deleteOne({_id:id})
    res.json({ msg: 'Image deleted', image });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500,'server error'))
  }
};
