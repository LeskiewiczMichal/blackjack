const mongoose = require("mongoose");
require("dotenv").config();

// Create user schema
const Skin = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Skin", Skin);
