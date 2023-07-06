const express = require('express');
const app = express();

// GET method
app.get('/', (req, res) => {
  res.send('Hello, GET method!');
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});