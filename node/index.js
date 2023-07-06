const http = require('http');
//custom module

//importing service
// const service = require('./service')
// const sum = require('.controller/sum.js')
// rekative and absolute path
// .. is to go back of a folder
// goto controller folder

const port = 3000;  //what is a port  why port is required ? server is a port local ke process ko port ki jrurt ni h
const server = http.createServer((req,res) => { 
   //code
   if(req.url == '/'){
    res.write("Server responde ");
    res.end();
   }
   else if (req.url== '/user/test'){
    res.write(" is testing");
    res.end();
   }
   
})

//diff bw fat arrow and arrow
// const server = http.createServer(function(req,res){

// })


server.listen(port);






// POST method
app.post('/', (req, res) => {
  res.send('Hello, POST method!');
});

// PUT method
app.put('/', (req, res) => {
  res.send('Hello, PUT method!');
});

// DELETE method
app.delete('/', (req, res) => {
  res.send('Hello, DELETE method!');
});

// PATCH method
app.patch('/', (req, res) => {
  res.send('Hello, PATCH method!');
});

// HEAD method
app.head('/', (req, res) => {
  res.send();
});

// OPTIONS method
app.options('/', (req, res) => {
  res.send('Hello, OPTIONS method!');
});




