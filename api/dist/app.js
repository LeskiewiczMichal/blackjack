"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connectToMongoDB_1 = require("./middleware/connectToMongoDB");
const setUpSession_1 = require("./middleware/setUpSession");
const passportConfig_1 = require("./middleware/passportConfig");
const users_1 = require("./routes/users");
const skins_1 = require("./routes/skins");
(0, connectToMongoDB_1.connectToMongoDB)(); // Database
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9000;
// CORS for my localhost
const corsOptions = {
    origin: "https://blackjack-9ujl.onrender.com/",
    credentials: true,
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(setUpSession_1.setUpSession);
app.use(passportConfig_1.passportConfig);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.use(express_1.default.static('public', {
    maxAge: 86400
}));
// app.use(express.static(path.join('public'), { maxAge: 86400 }));
// Routes
app.use("/users", users_1.usersRouter);
app.use("/skins", skins_1.skinsRouter);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build/", 'index.html'));
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
