"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads'); // Adjust the destination folder accordingly
        },
        filename: function (req, file, cb) {
            const userId = req.body.userId; // Use the user_id obtained from the token
            const timestamp = Date.now();
            cb(null, `profile_${userId}_${timestamp}_${file.originalname}`);
        },
    }),
}).single('profile-pic');
exports.default = upload;
