require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const path = require("path");
const usersRoute = require("./routes/users");
const skinsRoute = require("./routes/skins");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const ensureAuthenticated = require("./middleware/ensureAuthenticated");
const Schema = mongoose.Schema;

const UserDetails = require("./models/userDetails");
const Skin = require("./models/skin");


mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
const PORT = process.env.PORT || 9000;

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

// Routes
app.use("/users", usersRoute);
app.use("/skins", skinsRoute);


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
