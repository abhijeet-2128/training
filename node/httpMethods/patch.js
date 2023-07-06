const express = require('express')
const app = express();
// PATCH method
  app.patch('/', (req, res) => {
    res.send('Hello, PATCH method!');
  });
  // Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
