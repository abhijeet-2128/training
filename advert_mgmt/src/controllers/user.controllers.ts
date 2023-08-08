import User from "../model/User";
import jwt from 'jsonwebtoken';
import { Request,Response } from "express";
import Session from "../model/Session";
import bcrypt from 'bcrypt';
import Address from "../model/Address";
import Token from "../model/Token";
import Joi from 'joi';
import dotenv from 'dotenv';
import sendEmail from "../utils/sendEmail";
import crypto from 'crypto';
import { createClient } from "redis";
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import multerUpload from '../middleware/multerUpload';

dotenv.config();



//--------------------Signup------------------------------
export const signup=async(req:Request, res:Response)=>{
    try {
        const { username, password ,email, firstname} = req.body;
        

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
          return res.status(409).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

    
        // Create the new user
        const newUser = await User.create({ 
            username, 
            email,
            password:hashedPassword,
            firstname,
            
        });
    
        return res.status(201).json({ message: 'Signup successful', user: newUser });
      } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Signup failed' });
      }
}



//__________________________________________Login______________________________
export const login= async(req:Request,res:Response)=>{
    try {

    //redis connection
    const client = createClient();
    client.on("error", (err) => console.log("redis client error <-------------", err))
    client.connect().then(()=>{
      console.log("connected")
    }).then((error)=>{
      console.log("error")
    })
  

        const { username, password } = req.body;
    
        // Check if the user exists in the database
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Check if the password matches
        // if (user.password !== password) {
        //   return res.status(401).json({ message: 'Invalid credentials' });
        // }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        // User is authenticated, create a JWT token
        const token = jwt.sign({ userId: user.id }, 'asdfg', { expiresIn: '1h' });
        //session 
        const isSession = await Session.findOne({where: {userId :user.id}})
        if(!isSession){
            const session = await Session.create({
                userId :user.id,
                isActive : true
            });
        }

       //rdis session
       const redisSession = await client.get(`x`);
       console.log(redisSession)
       if (!redisSession) {
         let session_payload: any = {
           userId: user.id,
           isActive: true
 
         }
         await client.set(`${user.id}_session`, JSON.stringify(session_payload))
       }



         return res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Login failed' });
      }
}







//_______________________________get Profile__________________________
export const getProfile=async(req:Request,res:Response)=>{
    try {
        // Fetch the user details using the userId attached by the middleware
        console.log(req.body.userId);
        
        const user = await User.findOne({ where: { id: req.body.userId } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Return the user profile
        return res.status(200).json({ message: 'Profile retrieved successfully', user });
      } catch (error) {
        console.error('Error while fetching profile:', error);
        return res.status(500).json({ message: 'Failed to fetch profile' });
      }
}



//----------------------------update profile-------------------------
export async function updateProfile(req: Request, res: Response) {
  try {
      const { new_username, newPassword } = req.body;
      const userId = req.body.userId;

      // Find the user in the database
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's username and password if provided
      if (new_username) {
          user.username = new_username;
      }

      if (newPassword) {
          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
      }

      await user.save();

      // Respond with a success message
      return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
      // Handle any errors that might occur during profile update
      console.error('Error during profile update:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}

//-------------------delete profile
export async function deleteProfile(req: Request, res: Response) {
  try {
      const userId = req.body.userId;

      // Find the user in the database
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Perform any additional cleanup or operations before deleting the user (if required)

      // Delete the user from the database
      await user.destroy();

      // Respond with a success message
      return res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
      // Handle any errors that might occur during profile deletion
      console.error('Error during profile deletion:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}




//----------Logout --------------------------------------------
export const logout = async (req: Request, res: Response) => {
    try {
      // Get the userId from the request object (assuming you are using middleware to attach the userId to the request)
      const {userId } = req.body;

      // find user session 
      const session = await Session.findOne({ where: { userId } });
  
     // If the session does not exist or is already inactive
      if (!session || !session.isActive) {
        return res.status(404).json({ message: 'Session not found or already logged out' });
      }
  
     // Update the isActive field to false to indicate logout
      session.isActive = false;
      await session.save();
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Logout failed' });
    }
  };
  
//--------Forget Password ---------
export const forgetPassword = async(req: Request,res:Response)=>{
  // const {userId } = req.body;
  // const user = await User.findByPk(userId);
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({where:{ email: req.body.email} });
    if (!user)
        return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({where:{id: user.id }});
    if (!token) {
        token = await Token.create({
            id: user.id,
            token: crypto.randomBytes(32).toString("hex"),
        })
    }

    const link = `${process.env.BASE_URL}/reset-pass/${user.id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
} catch (error) {
    res.send("An error occured");
    console.log(error);
   }

}

export const resetPassword = async(req: Request,res:Response)=>{
 
  try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findByPk(req.params.user_id);
      if (!user) return res.status(400).send("invalid link or expired");

      const token = await Token.findOne({where:{
          id: user.id,
          token: req.params.token,
      }});
      if (!token) return res.status(400).send("Invalid link or expired");

      user.password = req.body.password;
      // await token.delete();
      await user.save();
      // token.delete();

      res.send("password reset sucessfully.");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
}


//---add Addresss-------------------
export async function addAddress(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const { street, city, state, zipCode } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new address and associate it with the user
    const newAddress = await Address.create({
      street,
      city,
      state,
      zipCode,
      userId, // Associate the address with the user
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Failed to add address:', error);
    res.status(500).json({ error: 'Failed to add address' });
  }
}





// router.post("/", async (req, res) => {
 
// });

