"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const authToken_1 = require("../middleware/authToken");
const product_controller_1 = require("../controllers/product.controller");
// import  multerUpload  from '..///middleware/multerUpload';
const profile_controller_1 = require("../controllers/profile.controller");
// import { createCategoriesAndSubCategories } from '../model/Category';
const router = express_1.default.Router();
router.post('/signup', user_controllers_1.signup);
router.post('/login', user_controllers_1.login);
router.get('/profile', authToken_1.authenticateToken, user_controllers_1.getProfile);
router.post('/logout', authToken_1.authenticateToken, user_controllers_1.logout);
router.put('/update-profile', authToken_1.authenticateToken, user_controllers_1.updateProfile);
router.delete('/profile', authToken_1.authenticateToken, user_controllers_1.deleteProfile);
router.post('/forget-pass', user_controllers_1.forgetPassword);
router.post('/reset-pass/:user_id/:token', user_controllers_1.resetPassword);
router.post('/address', authToken_1.authenticateToken, user_controllers_1.addAddress);
router.post('/upload', authToken_1.authenticateToken, profile_controller_1.add_profile_photo);
//--------
router.post('/add-product', authToken_1.authenticateToken, product_controller_1.addProduct);
router.get('/product', authToken_1.authenticateToken, product_controller_1.ViewProduct);
router.post('/bid', authToken_1.authenticateToken, product_controller_1.placeBid);
router.post('/category', authToken_1.authenticateToken, product_controller_1.createCategories);
router.get('/category', authToken_1.authenticateToken, product_controller_1.getCategory);
// router.post('/upload-photo',multerUpload,add)
exports.default = router;
