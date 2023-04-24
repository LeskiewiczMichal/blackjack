"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// Create user schema
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Number, required: true },
    ownedSkins: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Skin" }],
    activeSkins: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Skin" }],
});
// Setting up passport plugin
userSchema.plugin(passport_local_mongoose_1.default, { usernameField: "email" });
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
