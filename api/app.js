const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const ensureAuthenticated = require("./middleware/ensureAuthenticated");
const Schema = mongoose.Schema;
// require("dotenv").config(); // Load environment variables from .env file

const UserDetails = require("./userDetails");

const app = express();

// CORS for my localhost
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Set up session
app.use(
  session({
    secret: "blackjack",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up passport
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// Configs
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", ensureAuthenticated, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await UserDetails.findById(user._id).exec();
    return res.json({ user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Register user
app.post("/users", async (req, res) => {
  UserDetails.register(
    new UserDetails({
      username: req.body.username,
      email: req.body.email,
      balance: 1000,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate("local")(req, res, () => {
        res.status(200).json({ message: "Registration successful" });
      });
    }
  );
});

// Update user balance
app.put("/users/balance", ensureAuthenticated, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await UserDetails.findById(user._id).exec();
    userData.balance = req.body.balance;
    await userData.save();
    return res.json({ user: userData });
  } catch {
    return res.status(500).json({ message: error.message });
  }
});

// Login user
app.post("/users/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;
  res.json({ user });
});

// Logout user
app.post("/users/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

app.listen(9000, () => console.log("App listening on port 9000"));
