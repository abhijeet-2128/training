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
app.post('/merge', (req, res) => {
  try {
    const file1 = fs.readFileSync('file1.txt', 'utf8');
    const file2 = fs.readFileSync('file2.txt', 'utf8');
    const merged = file1 + file2;
    fs.writeFileSync('newfile.txt', merged);
    res.send('Files merged successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error merging files');
  }
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