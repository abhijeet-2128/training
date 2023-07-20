import express from 'express';
import { createPost, editPost, deletePost } from '../controllers/postController';
import { authenticateToken } from '../middleware/authToken'; // Import the authenticateToken middleware
;
const router = express.Router();

// Protected route - Create post (accessible only with a valid token)
router.post('/create-post', authenticateToken, createPost);

router.put('/edit-post/:postId', authenticateToken, editPost);
router.delete('/delete-post/:postId', authenticateToken, deletePost);


export default router;
