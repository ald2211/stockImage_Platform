import express from 'express';
import { addImages, deleteImage, editImage, rearrangeImages, uploadImages } from '../controllers/image.controller.js';
import verifyUser from '../utils/verify.js';


const router= express.Router()


// Upload images route
router.post('/upload', verifyUser, uploadImages, addImages);

// Rearrange images route
router.put('/rearrange', verifyUser, rearrangeImages);

// Edit image route
router.put('/edit/:id', verifyUser, editImage);

// Delete image route
router.delete('/delete/:id', verifyUser, deleteImage);


export default router