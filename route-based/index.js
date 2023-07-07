const express = require('express');
const app = express();
const birds=require('./birds');
const calculator=require('./calculator');

app.use(express.json());

app.use(birds);
app.use(calculator);

app.listen(3000,()=>{
    console.log("listening on port ");
});