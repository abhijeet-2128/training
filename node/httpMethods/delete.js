const express = require('express');
const app = express();

 // DELETE method
 
 app.delete('/', (req, res) => {
    res.send('Hello, DELETE method!');
  });

  // Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });