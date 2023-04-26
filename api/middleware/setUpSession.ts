import session, { Store } from "express-session";
const MongoDBStore = require('connect-mongodb-session')(session);

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET environment variable not set");

const store = new (MongoDBStore as any)({
  uri: process.env.DB_CONNECTION,
  collection: "sessions",
}) as Store;

// Set up session
export const setUpSession = session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: store as Store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});
