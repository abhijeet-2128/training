import express from 'express';
import {forgetPassword, signup,login,getProfile, logout, updateProfile, deleteProfile, addAddress, resetPassword } from '../controllers/user.controllers';
import { authenticateToken } from '../middleware/authToken';
import { addProduct, placeBid } from '../controllers/product.controller';

const router = express.Router();


router.post('/signup', signup);
router.post('/login',login);
router.get('/profile',authenticateToken,getProfile);
router.post('/logout',authenticateToken,logout);
router.put('/update-profile', authenticateToken,updateProfile);
router.delete('/profile',authenticateToken,deleteProfile);


router.post('/forget-pass',forgetPassword);
router.post('/reset-pass/:user_id/:token',resetPassword)

router.post('/address',authenticateToken,addAddress);

//--------
router.post('/add-product',authenticateToken,addProduct);
router.post('/bid',authenticateToken,placeBid);
export default router;