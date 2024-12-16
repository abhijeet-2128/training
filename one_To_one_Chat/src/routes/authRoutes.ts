import { Router } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({
        message: 'Username already exists. Please choose a different username.',
      });
    }

    const user = await UserModel.create({ username, password });
    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!);

    res.send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials. User not found.',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials. Incorrect password.',
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
