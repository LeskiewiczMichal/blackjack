const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ensureAuthenticated = require("./middleware/ensureAuthenticated");
const Schema = mongoose.Schema;
// require("dotenv").config(); // Load environment variables from .env file

const UserDetails = require("./userDetails");

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));


// Set up session
app.use(
  session({
    secret: "blackjack",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
passport.use(UserDetails.createStrategy());
// Serialize and deserialize user
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Working fine");
//   res.json({
//     message: "Welcome to the API",
//   });
// });

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

app.post("/users", async (req, res) => {
  // let hashedPassword = await bcrypt.hash(req.body.password, 5);

  // const user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: hashedPassword,
  //   balance: 1000,
  // });

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

app.post("/users/login", passport.authenticate("local"), (req, res) => {
  // Authenticate user and get him from database
  const user = req.user;

  //   req.logIn(user, (err) => {
  //     if (err) {
  //       return res.status(400).json(err);
  //     }
  //   });
  res.json({ user });
});

app.post("/users/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

app.listen(9000, () => console.log("App listening on port 9000"));
