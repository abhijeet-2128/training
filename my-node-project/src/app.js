const express = require('express');
const app = express();

//importing the routes
const userRoutes = require('./routes/userRoutes');
const home = require('./routes/home');
const calculator = require('./routes/calculator');
//use routes

app.use(home);
app.use(calculator);
app.use(userRoutes);



app.listen(3000,()=>{
    console.log("listening on port ");
});