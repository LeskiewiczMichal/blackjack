const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = mongoose.Schema;

const mongoDb = "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model("User", new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
})
);

const app = express();

app.use(cors());

app.use(session({ secret: "blackjack", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log("Working fine");
});

app.listen(9000, () => console.log("App listening on port 9000!"));