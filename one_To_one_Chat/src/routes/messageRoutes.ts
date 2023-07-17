import { Router } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MessageModel } from '../models/message';
import { UserModel } from '../models/user';

const router = Router();

router.post('/send-message', async (req: Request, res: Response) => {
  try {
    const { recipientUsername, content } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token not provided.' });
    }

    const accessToken = authHeader.split(' ')[1];

    const decodedToken: any = jwt.verify(accessToken, process.env.JWT_SECRET!);

    const senderUserId = decodedToken.userId;

    const sender = await UserModel.findByPk(senderUserId);
    if (!sender) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    const recipient = await UserModel.findOne({ where: { username: recipientUsername } });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    const newMessage = await MessageModel.create({
      content: content,
      senderId: senderUserId,
      recipientId: recipient.id,
    });

    console.log('New message:', newMessage);

    res.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
