import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  full_name: String,
  bio: String,
  profile_pic: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


export const User = mongoose.model('Users', userSchema);
