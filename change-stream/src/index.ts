import express from "express";
import { User, User1 } from "./model/Model";
import { Request, Response } from 'express';
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://abhijeetsrivastava:abhijeet2128@ac-rjqxqg0-shard-00-00.akwqecd.mongodb.net:27017,ac-rjqxqg0-shard-00-01.akwqecd.mongodb.net:27017,ac-rjqxqg0-shard-00-02.akwqecd.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqlsea-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("Connected to DB."))
  .catch((err: any) => console.error("Error connecting to DB:", err));

const userChangeStream = User.watch();
const user1ChangeStream = User1.watch();


userChangeStream.on("change", async (data: any) => {
  console.log(data, "changes");
  if (data.operationType === "insert") {
    console.log("User Inserted: ", data.fullDocument);
    // await User1.create(data.fullDocument);
    await insertUniqueDocument(User1, data.fullDocument);
  }
});
user1ChangeStream.on("change", async (data: any) => {
    console.log(data, "changes");
    if (data.operationType === "insert") {
      console.log("User Inserted: ", data.fullDocument);
    //   await User.create(data.fullDocument);
      await insertUniqueDocument(User, data.fullDocument);
    }
  });


async function insertUniqueDocument(model: mongoose.Model<any>, document: any) {
  // Check if the document with the same _id exists in the collection
  const existingDocument = await model.exists({ _id: document._id });

  if (existingDocument) {
    console.log(`Document with the same _id already exists in ${model.collection.name} collection.`);
  } else {
    try {
      const newDocument = new model(document);
      const savedDocument = await newDocument.save();
      console.log(savedDocument);
    } catch (err) {
      console.error("Error saving document:", err);
    }
  }
}

app.get('/', async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      email: "abhijeet@gmail.com",
      firstName: "abhi",
      lastName: "sri",
    });
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error creating User:", err);
    res.status(500).json({ error: "Error creating User" });
  }
});

app.get('/1', async (req: Request, res: Response) => {
    try {
        const newUser1 = new User1({
            email: "ajay@gmail.com",
            firstName: "ajay",
            lastName: "ku",
        });
        const user = await newUser1.save();
        console.log(user)
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



app.listen(4000, () => {
  console.log('Server started on port http://localhost:4000.');
});

