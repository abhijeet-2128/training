const express = require('express')
const router = express.Router()


router.get('/calculator', function (req, res) {
  res.send('Hello! This is calculator')
})

router.get('/calculator/add/:num1/:num2', function (req, res) {
  // var num1 = parseInt(req.params.num1)
  // var num2 = parseInt(req.params.num2)
  // var sum = (num1 + num2).toString()
  res.send((parseInt(req.params.num1) + parseInt(req.params.num2)).toString());
})

router.get('/subtract/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var difference = (num1 - num2).toString()
  res.send(`Difference of ${num1} and ${num2} is`+difference)
})

router.get('/multiply/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var product = (num1 * num2).toString()
  res.send(product)
})

router.get('/divide/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var quotient = (num1 / num2).toString()
  res.send(quotient)

})

router.get('/power/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var pow = (num1 ** num2).toString()
  res.send(pow)
})

router.get('/sqrt/:num1', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var squareroot = (Math.sqrt(num1)).toString()
  res.send(`suareroot of ${num1} is` + squareroot)
})

module.exports = router