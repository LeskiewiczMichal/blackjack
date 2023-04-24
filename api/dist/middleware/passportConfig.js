"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const userDetails_1 = require("../models/userDetails");
passport_1.default.use(userDetails_1.User.createStrategy());
passport_1.default.serializeUser(userDetails_1.User.serializeUser());
passport_1.default.deserializeUser(userDetails_1.User.deserializeUser());
exports.passportConfig = [
    passport_1.default.initialize(),
    passport_1.default.session(),
];
