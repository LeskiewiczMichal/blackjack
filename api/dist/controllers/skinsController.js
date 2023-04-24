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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.buy = exports.getById = exports.getAll = void 0;
const skin_1 = require("../models/skin");
// Get skins
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skins = yield skin_1.Skin.find({});
        res.json({ skins });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAll = getAll;
// Get skin by id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const skin = yield skin_1.Skin.findById(req.params.id);
        console.log(skin);
        res.json({ skin });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getById = getById;
// Buy skin
const buy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skin = yield skin_1.Skin.findById(req.params.id);
        if (!skin) {
            return res.status(404).json({ message: "Skin not found" });
        }
        // Check if user has enough money
        if (user.balance < skin.price) {
            return res.status(400).json({ message: "Not enough money" });
        }
        // Add skin to user's owned skins
        user.ownedSkins.push(skin._id);
        // Remove money from user's balance
        user.balance -= skin.price;
        yield user.save();
        yield user.populate("activeSkins");
        yield user.populate("ownedSkins");
        return res.json({
            ownedSkins: user.ownedSkins,
            activeSkins: user.activeSkins,
            userBalance: user.balance,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.buy = buy;
// Activate skin
const activate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skin = yield skin_1.Skin.findById(req.params.id);
        if (!skin) {
            return res.status(404).json({ message: "Skin not found" });
        }
        // Check if skin of the same category is already in user's active skins
        const activeSkin = yield skin_1.Skin.findOne({
            _id: { $in: user.activeSkins },
            category: skin.category,
        });
        if (activeSkin) {
            // If so, remove it from active skins
            user.activeSkins = user.activeSkins.filter((skin) => skin.toString() !== activeSkin._id.toString());
        }
        // Add skin to user's active skins
        user.activeSkins.push(skin._id);
        yield user.save();
        yield user.populate("activeSkins");
        yield user.populate("ownedSkins");
        res.json({ ownedSkins: user.ownedSkins, activeSkins: user.activeSkins });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.activate = activate;
// Deactivate skin
const deactivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skin = yield skin_1.Skin.findById(req.params.id);
        if (!skin) {
            return res.status(404).json({ message: "Skin not found" });
        }
        // Check if skin of the same category is already in user's active skins
        const activeSkin = yield skin_1.Skin.findOne({
            _id: { $in: user.activeSkins },
            category: skin.category,
        });
        if (activeSkin) {
            // If so, remove it from active skins
            user.activeSkins = user.activeSkins.filter((skin) => skin.toString() !== activeSkin._id.toString());
        }
        yield user.save();
        yield user.populate("activeSkins");
        yield user.populate("ownedSkins");
        res.json({ ownedSkins: user.ownedSkins, activeSkins: user.activeSkins });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deactivate = deactivate;
