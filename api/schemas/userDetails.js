const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

// Connect database
// const mongoDb =
//   "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "mongo connection error"));

// Create user schema
const User = new mongoose.Schema({
  username: { type: String, required: true },
//   password: String,
  email: { type: String, required: true },
  balance: { type: Number, required: true },
  ownedSkins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skin" }],
  activeSkins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skin" }],
});

// Setting up passport plugin
User.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", User);