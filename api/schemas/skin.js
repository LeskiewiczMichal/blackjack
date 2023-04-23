const mongoose = require('mongoose');
require('dotenv').config();

// Connect database
// const mongoDb =
//   "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "mongo connection error"));

// Create user schema
const Skin = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  prevImage: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Skin", Skin);