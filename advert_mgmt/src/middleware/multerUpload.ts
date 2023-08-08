import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
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

export default upload;
