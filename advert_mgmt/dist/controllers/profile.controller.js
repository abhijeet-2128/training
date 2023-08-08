"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_profile_photo = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../model/User"));
const app = (0, express_1.default)();
// app.use(bodyParser.json());
const port = 3000;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'upload';
        fs_1.default.mkdirSync(uploadDir, { recursive: true }); // Create the 'upload' directory if it doesn't exist
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});
const upload = (0, multer_1.default)({ storage });
const add_profile_photo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded_id = req.body.userId;
    const user = yield User_1.default.findOne({ where: { id: decoded_id } });
    if (!user) {
        res.send("user not found");
    }
    if (user) {
        try {
            upload.single('profile-pic')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err instanceof multer_1.default.MulterError) {
                    return res.status(400).send(err);
                }
                else if (err) {
                    return res.status(500).send(err);
                }
                if (!req.file) {
                    return res.status(400).send('No photo uploaded.');
                }
                const { filename } = req.file;
                console.log('Uploaded photo:', filename);
                ;
                const fileBuffer = fs_1.default.readFileSync(path_1.default.join('upload', filename));
                const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
                // console.log(fileBuffer);
                if (user) {
                    yield User_1.default.update({
                        profile_pic: fileBuffer
                    }, {
                        where: { id: decoded_id }
                    });
                    yield user.save();
                    res.status(200).send("Photo uploaded successfully... ");
                }
            }));
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('some error occured');
        }
    }
});
exports.add_profile_photo = add_profile_photo;
