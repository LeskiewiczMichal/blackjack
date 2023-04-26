"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goBancrupt = exports.getUserSkins = exports.logoutUser = exports.login = exports.updateBalance = exports.register = exports.getUserData = void 0;
const passport_1 = __importDefault(require("passport"));
const userDetails_1 = require("../models/userDetails");
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userData = yield userDetails_1.User.findById(user._id).exec();
        return res.json({ user: userData });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getUserData = getUserData;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userDetails_1.User.register(new userDetails_1.User({
        username: req.body.username,
        email: req.body.email,
        balance: 1000,
        ownedSkins: [],
        activeSkins: [],
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
        passport_1.default.authenticate("local")(req, res, () => {
            res.status(200).json({ message: "Registration successful" });
        });
    });
});
exports.register = register;
const updateBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userData = (yield userDetails_1.User.findById(user._id).exec());
        userData.balance = req.body.balance;
        yield userData.save();
        return res.json({ user: userData });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateBalance = updateBalance;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const user = req.user;
    console.log(user);
    yield user.populate("activeSkins");
    yield user.populate("ownedSkins");
    res.json({ user });
});
exports.login = login;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout(() => { });
    res.json({ message: "Logout successful" });
});
exports.logoutUser = logoutUser;
const getUserSkins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getUserSkins = getUserSkins;
const goBancrupt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userData = (yield userDetails_1.User.findById(user._id).exec());
        userData.balance = 1000;
        userData.activeSkins = [];
        yield userData.save();
        return res.json({ user: userData });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.goBancrupt = goBancrupt;
