import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  }
});

const user1Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  }
});

const User = mongoose.model("User", userSchema);
const User1 = mongoose.model("User1", user1Schema)

export {User, User1};