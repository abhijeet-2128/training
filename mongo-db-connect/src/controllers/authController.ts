import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/user";

// Replace 'your-secret-key' with a secure secret key for JWT
const JWT_SECRET_KEY = 'asdfgh';

export async function signup(req: Request, res: Response) {
  try {
    const { username, email, password, full_name, bio, profile_pic } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      bio,
      profile_pic,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token for the user
    jwt.sign({ username: user.username, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create JWT token" });
      }
      // Send the token back to the user
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
