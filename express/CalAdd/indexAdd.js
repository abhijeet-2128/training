const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/add/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var sum = (num1 + num2).toString()
  res.send(sum)
})



app.listen(3000, function () {
  console.log('Successfully started express application!')
})
