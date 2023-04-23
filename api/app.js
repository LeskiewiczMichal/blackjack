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

const UserDetails = require("./schemas/userDetails");
const Skin = require("./schemas/skin");

const mongoDb =
  "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

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
      ownedSkins: [],
      activeSkins: [],
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
app.post("/users/login", passport.authenticate("local"), async (req, res) => {
  const user = req.user;
  await user.populate("activeSkins");
  await user.populate("ownedSkins");
  res.json({ user });
});

// Logout user
app.post("/users/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

// Get user skins
app.get("/users/skins", ensureAuthenticated, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    user.populate("activeSkins");
    user.populate("ownedSkins");

    return res.json({
      ownedSkins: user.ownedSkins,
      activeSkins: user.activeSkins,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/// SHOP ///
app.get("/skins", async (req, res) => {
  try {
    const skins = await Skin.find({});
    res.json({ skins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/skins/:id", async (req, res) => {
  try {
    const skin = await Skin.findById(req.params.id);
    res.json({ skin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Activate skin
app.post("/skins/activate/:id", ensureAuthenticated, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skin = await Skin.findById(req.params.id);

    // Check if skin of the same category is already in user's active skins
    const activeSkin = await Skin.findOne({
      _id: { $in: user.activeSkins },
      category: skin.category,
    });

    if (activeSkin) {
      // If so, remove it from active skins
      user.activeSkins = user.activeSkins.filter(
        (skin) => skin.toString() !== activeSkin._id.toString()
      );
    }

    // Add skin to user's active skins
    user.activeSkins.push(skin._id);

    await user.save();

    await user.populate("activeSkins");
    await user.populate("ownedSkins");
    res.json({ ownedSkins: user.ownedSkins, activeSkins: user.activeSkins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(9000, () => console.log("App listening on port 9000"));
