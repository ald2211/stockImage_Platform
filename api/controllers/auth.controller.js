import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/customError.js';


// Register
export const register = async (req, res,next) => {
  const { email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)return next(errorHandler(400,'User already exists'));

    const salt = await bcrypt.genSalt(10);
    let hashedPassword=await bcrypt.hash(password,salt)

    user = new User({ email, phone, password:hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log('error at token creation:',err);
        return next(errorHandler(err.statusCode,'Sign in Failed please try again'))
      }
      const {password,...rest}=user._doc
      res.status(200).json({success:true,message:'welcome',userData:rest,token})
    });
  } catch (error) {
    console.log('ee',error.message);
    next(error)
  }
};

// Login
export const login = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return next(errorHandler(400,'Invalid credentials'));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler(400,'Invalid credentials'));

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log('login err:',err)
        return next(errorHandler(400,'login failed'))
      }
      const {password,...rest}=user._doc
      res.status(200).json({success:true,message:'welcome',userData:rest,token})
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};



// export const logOut=async (req,res,next)=>{

// }