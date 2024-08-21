import express from 'express';
import { login, register, resetPassword } from '../controllers/auth.controller.js';

const router= express.Router()

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Password reset route
router.post('/reset-password', resetPassword);





export default router