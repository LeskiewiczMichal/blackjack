"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const ensureAuthenticated_1 = require("../middleware/ensureAuthenticated");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
exports.usersRouter = router;
// Get user data
router.get("/", ensureAuthenticated_1.ensureAuthenticated, usersController_1.getUserData);
// Register user
router.post("/", usersController_1.register);
// Update user balance
router.put("/balance", ensureAuthenticated_1.ensureAuthenticated, usersController_1.updateBalance);
// Login user
router.post("/login", passport_1.default.authenticate("local"), usersController_1.login);
// Logout user
router.post("/logout", ensureAuthenticated_1.ensureAuthenticated, usersController_1.logoutUser);
// Get user skins
router.get("/skins", ensureAuthenticated_1.ensureAuthenticated, usersController_1.getUserSkins);
router.post("/bancrupt", ensureAuthenticated_1.ensureAuthenticated, usersController_1.goBancrupt);
