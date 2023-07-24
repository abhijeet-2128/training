import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/user";
import { Post } from '../models/post'; 

const JWT_SECRET_KEY = 'asdfgh'

export async function createPost(req: Request, res: Response) {
  try {
    const { caption, image_url } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    // Verify the token and ex
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY,) as { username: string; email: string };
    const { username, email } = decodedToken;

    // Find the user in the database 
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Create a new post using the Post model and save it to the database
    const newPost = new Post({
      user_id: user._id, // Associate the post with the user using their user_id
      caption,
      image_url,
    });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', createdBy: { username, email }, post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
export async function editPost(req:Request, res:Response){
  try{
    const postId = req.params.postId;
    const {caption, image_url} = req.body;

    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({message : 'Post not found'});
    }

    post.caption = caption;
    post.image_url = image_url;
    await post.save();

    res.status(200).json({message: 'Post updated success'})
  }
  catch(error){
     console.error('Error editing post :' ,error);
       res.status(500).json({error : 'Failed to edit post'});
  }
}

export async function deletePost(req : Request , res : Response){
      const postId = req.params.postId;
      const post = await Post.findByIdAndDelete(postId);
      
    if(!post){
      return res.status(404).json({message : 'Post not found'});
    } 
    res.json({ message: 'Post deleted successfully' });
 
}