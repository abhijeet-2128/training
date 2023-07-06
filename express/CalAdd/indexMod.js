const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
  
  app.get('/mod/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    var quotient = (num1 % num2).toString()
    res.send(quotient)
  })



  app.listen(3000, function () {
    console.log('Successfully started express application!')
  })