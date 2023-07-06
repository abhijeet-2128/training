const express = require('express');
const app = express();


 // OPTIONS method
 app.options('/', (req, res) => {
    res.send('Hello, OPTIONS method!');
  });
   // Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });