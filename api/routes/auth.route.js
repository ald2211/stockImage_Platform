import express from 'express';
import { checkingAuthRoute } from '../controllers/auth.controller.js';

const router= express.Router()

router.get('/authRouteChecking',checkingAuthRoute)






export default router