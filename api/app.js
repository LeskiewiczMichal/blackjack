const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const mongoDb =
  "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  })
);

const app = express();

app.use(cors());

app.use(
  session({ secret: "blackjack", resave: false, saveUninitialized: false })
);
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec()
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Working fine");
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/users", async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 5);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();
    res.json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.post("/users/login", passport.authenticate("local"), (req, res) => {
  // Sending username and password, authenticate and get user back

  // Authenticate user and get him from database
  const user = req.user;
  console.log(user);

  res.json({ user });
});

app.listen(9000, () => console.log("App listening on port 9000"));
