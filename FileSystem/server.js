const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

//first end point
app.get('/',(req,res)=>{
  res.send("Upload here");
})

// Configure multer to specify the upload directory and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create the multer upload instance
const upload = multer({ storage: storage });

// Define a route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
});

//merge requests
app.post('/merge', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), (req, res) => {
  const files = req.files;
  if (!files || !files.file1 || !files.file2) {
    return res.status(400).send('Two files must be uploaded.');
  }

  // Read the content of the two files
  const file1Content = fs.readFileSync(files.file1[0].path, 'utf-8');
  const file2Content = fs.readFileSync(files.file2[0].path, 'utf-8');

  // Merge the file contents
  const mergedContent = file1Content + file2Content;

  // Perform any additional processing or logic on the merged content if needed

  res.send(mergedContent);
});


app.post('/read', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

const filePath = req.file.path;
const fileContent = fs.readFileSync(filePath,'utf-8');
  
res.send(`Reading File : ${fileContent}`)
  
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});