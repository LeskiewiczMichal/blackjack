import mongoose from "mongoose";
import { Store } from "express-session";

// const mongoDB = process.env.MONGODB_URI || process.env.DB_CONNECTION;
const mongoDB = "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  if (!mongoDB) {
    throw new Error("DB_CONNECTION environment variable not set");
  }


  try {
    await mongoose.connect(mongoDB);
  } catch (error) {
    console.error.bind(console, "mongo connection error");
  }
};


export { connectToMongoDB };
