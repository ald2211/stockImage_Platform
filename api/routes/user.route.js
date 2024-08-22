import express from 'express';
import { resetUserPassword} from '../controllers/user.controller.js';
import verifyUser from '../utils/verify.js';


const router= express.Router()

// reset user password
router.patch('/resetPassword',verifyUser,resetUserPassword)




export default router