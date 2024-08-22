import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/customError.js";

export const resetUserPassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
   
    const { user } = req;
  
    try {
      let currentUser = await User.findOne({ _id: user.id });
      if (!currentUser) {
        return next(errorHandler(400, 'User not found'));  
      }
      console.log('currentPassword:',currentPassword)
      console.log('currentUser:',currentUser)
      const isMatch = await bcrypt.compare(currentPassword,currentUser.password);
      if (!isMatch) {
        return next(errorHandler(400, 'Current Password is wrong'));  
      }
  
      const salt = await bcrypt.genSalt(10);
      currentUser.password = await bcrypt.hash(newPassword, salt);
      await currentUser.save();
  
      res.status(200).json({ success: true, msg: 'Password reset successful' });

    } catch (error) {
      console.log('error :',error);
      next(errorHandler(500, 'Server error'));  
    }
  };
  