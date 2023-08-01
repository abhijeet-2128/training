import express from 'express';
import {forgetPassword, signup,login,getProfile, logout, updateProfile, deleteProfile, addAddress, resetPassword} from '../controllers/user.controllers';
import { authenticateToken } from '../middleware/authToken';
import { ViewProduct, addProduct, createCategories, getCategory, placeBid } from '../controllers/product.controller';
// import  multerUpload  from '..///middleware/multerUpload';
import {add_profile_photo} from '../controllers/profile.controller';
// import { createCategoriesAndSubCategories } from '../model/Category';
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
router.post('/upload',authenticateToken,add_profile_photo)
//--------
router.post('/add-product',authenticateToken,addProduct);
router.get('/product',authenticateToken,ViewProduct)
router.post('/bid',authenticateToken,placeBid);

router.post('/category',authenticateToken, createCategories)
router.get('/category',authenticateToken,getCategory);

// router.post('/upload-photo',multerUpload,add)
export default router;