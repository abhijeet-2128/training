import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const userId = user.id;

    // const token = jwt.sign({ userId }, 'secret');

    res.send("User created successfully please login");
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: any = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const token = jwt.sign({ userId: user.id }, 'secret');
    res.send({ token });
  } catch (error) {
    console.error('Failed to login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};