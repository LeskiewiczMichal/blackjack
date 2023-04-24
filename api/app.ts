require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import { usersRouter } from "./routes/users";
import { skinsRouter } from "./routes/skins";
import { User } from "./models/userDetails";

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
passport.use((User as any).createStrategy());
passport.serializeUser((User as any).serializeUser());
passport.deserializeUser((User as any).deserializeUser());

// Configs
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/skins", skinsRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
