import { Request, Response } from 'express';
import { Followers } from '../models/followers';

export async function createFollower(req: Request, res : Response) {
    try {
      const { follower_id, following_id } = req.body;
      const newFollower = await Followers.create({ follower_id, following_id });
      res.status(200).json(newFollower);
    } catch (err) {
      res.status(500).json({ error: 'Error creating the follower relationship' });
    }
  }
  