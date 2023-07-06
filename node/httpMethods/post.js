const express = require('express');
const app = express();

// POST method
app.post('/', (req, res) => {
    res.send('Hello, POST method!');
  });
  

 // Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
 
  
