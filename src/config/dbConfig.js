import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the DB");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
    console.log(error);
  }
}

//bhavanamatavalam bSUwhg34PlnVhBsK
