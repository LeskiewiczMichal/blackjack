import mongoose from "mongoose";
import MongoDBStore from "connect-mongodb-session";

const connectToMongoDB = async () => {
  if (!process.env.DB_CONNECTION) {
    throw new Error("DB_CONNECTION environment variable not set");
  }

  try {
    await mongoose.connect(process.env.DB_CONNECTION);
  } catch (error) {
    console.error.bind(console, "mongo connection error");
  }
};

const store = new (MongoDBStore as any)({
  uri: process.env.DB_CONNECTION,
  collection: "sessions",
});

export { connectToMongoDB, store };
