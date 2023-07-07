const express = require('express');
const app = express();
require('dotenv').config()  

//importing the routes
const userRoutes = require('./routes/userRoutes');
const home = require('./routes/home');
const calculator = require('./routes/calculator');

//use routes
app.use(home);
app.use(calculator);
app.use(userRoutes);

//access env variables
const dbport = process.env.DB_PORT
const dbhost = process.env.DB_HOST


app.listen(3000,()=>{
    console.log("listening on port ");
});