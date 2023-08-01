import express from 'express';
import multer from 'multer';
import { Request,Response } from 'express';
import path from 'path';
import fs from 'fs';
import User from '../model/User';
import { build } from 'joi';




const app=express();
// app.use(bodyParser.json());
const port=3000;



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'upload';
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the 'upload' directory if it doesn't exist
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  });
  

const upload = multer({ storage });

export const add_profile_photo = async(req: Request, res: Response) => {

    const decoded_id=req.body.userId;
    const user= await User.findOne({where:{id:decoded_id}});
    if(!user)
    {
        res.send("user not found");
    }
    if(user){
    try {
        upload.single('profile-pic')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).send(err);
            } else if (err) {
                return res.status(500).send(err);
            }

            if (!req.file) {
                return res.status(400).send('No photo uploaded.');
            }

            const { filename } = req.file;
            console.log('Uploaded photo:', filename);
          ;

        const fileBuffer = fs.readFileSync(path.join('upload', filename));
        const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
        // console.log(fileBuffer);
        if(user)
        {
           await User.update({
                profile_pic: fileBuffer
            },{
                where:{id:decoded_id}
            })
            await user.save();
            res.status(200).send("Photo uploaded successfully... " );
        }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('some error occured');
    }
}
};