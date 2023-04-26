"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const MongoDBStore = require('connect-mongodb-session')(express_session_1.default);
const SECRET = process.env.SECRET;
if (!SECRET)
    throw new Error("SECRET environment variable not set");
const store = new MongoDBStore({
    uri: process.env.DB_CONNECTION,
    collection: "sessions",
});
// Set up session
exports.setUpSession = (0, express_session_1.default)({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
});
