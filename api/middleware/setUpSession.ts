import session from "express-session";
import { store } from "./connectToMongoDB";

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET environment variable not set");

// Set up session
export const setUpSession = session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
