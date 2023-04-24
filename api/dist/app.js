"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // Load environment variables from .env file
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users");
const skins_1 = require("./routes/skins");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const mongoose = require("mongoose");
// const MongoStore = require("connect-mongo")(session);
// const cors = require("cors");
const cors_1 = __importDefault(require("cors"));
// const UserDetails = require("./models/userDetails");
const userDetails_1 = require("./models/userDetails");
const Skin = require("./models/skin");
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9000;
// CORS for my localhost
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Set up session
app.use((0, express_session_1.default)({
    secret: "blackjack",
    resave: false,
    saveUninitialized: false,
}));
// Set up passport
passport_1.default.use(userDetails_1.User.createStrategy());
passport_1.default.serializeUser(userDetails_1.User.serializeUser());
passport_1.default.deserializeUser(userDetails_1.User.deserializeUser());
// Configs
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Routes
app.use("/users", users_1.usersRouter);
app.use("/skins", skins_1.skinsRouter);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
