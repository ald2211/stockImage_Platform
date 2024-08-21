import Image from '../models/image.model.js';
import multer from 'multer';
import path from 'path';
import { errorHandler } from '../utils/customError.js';

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadImages = upload.array('images', 10); // Allow up to 10 images

export const addImages = async (req, res,next) => {
  const { titles } = req.body; // titles should be an array
  const { user } = req;

  try {
    const images = req.files.map((file, index) => ({
      title: titles[index],
      imageUrl: `/uploads/${file.filename}`,
      user: user.id,
      order: index,
    }));

    await Image.insertMany(images);
    res.json({ msg: 'Images uploaded successfully' });
  } catch (error) {
    console.error(error.message);
    next
  }
};

export const rearrangeImages = async (req, res) => {
  const { imageOrder } = req.body; // imageOrder should be an array of image IDs in the new order
  try {
    for (let i = 0; i < imageOrder.length; i++) {
      await Image.findByIdAndUpdate(imageOrder[i], { order: i });
    }
    res.json({ msg: 'Image order updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const editImage = async (req, res) => {
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

    await image.save();
    res.json({ msg: 'Image updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) next(404,'Image not found');
    await image.remove();
    res.json({ msg: 'Image deleted' });
  } catch (error) {
    console.error(error.message);
    next(errorHandler(500,'server error'))
  }
};
