import express from 'express';
import { createFollower } from '../controllers/followerController';

const router = express.Router();

router.post('/addFollower', createFollower);


export default router;


