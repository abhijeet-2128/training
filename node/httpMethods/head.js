const express = require('express');
const app = express();

app.head('/', (req, res) => {
    res.send();
  });

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

