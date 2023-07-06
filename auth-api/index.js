// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Set up Express app
const app = express();
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Define user model
const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/register', async (req, res) => {
  try {
    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await user.save();

    // Send response
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Log in an existing user
app.post('/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Compare password using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send response
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));