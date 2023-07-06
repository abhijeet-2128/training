const express = require('express')
const router = express.Router()

// middleware that is specific to this router

// define the home page route
router.get('/home', (req, res) => {
  res.send('My home page')
})
// define the about route
router.get('/home/about', (req, res) => {
  res.send('About section')
})

module.exports = router