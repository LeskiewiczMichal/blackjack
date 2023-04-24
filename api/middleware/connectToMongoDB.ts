import mongoose from "mongoose";

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

export { connectToMongoDB };

// OLD
// mongoose.connect(process.env.DB_CONNECTION, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "mongo connection error"));
