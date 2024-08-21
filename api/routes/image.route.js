import express from 'express';
import { checkingImageRoute } from '../controllers/image.controller.js';

const router= express.Router()

router.get('/imageRouteChecking',checkingImageRoute)


export default router