import session from "express-session";

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET environment variable not set");

// Set up session
export const setUpSession = session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
});
