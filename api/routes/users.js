const { Router } = require("express");
const passport = require("passport");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const UserDetails = require("../models/userDetails");
const {
  getUserData,
  register,
  updateBalance,
  login,
  logout,
  getUserSkins,
} = require("../controllers/usersController");

const router = Router();

// Get user data
router.get("/", ensureAuthenticated, getUserData);

// Register user
router.post("/", register);

// Update user balance
router.put("/balance", ensureAuthenticated, updateBalance);

// Login user
router.post("/login", passport.authenticate("local"), login);

// Logout user
router.post("/logout", logout);

// Get user skins
router.get("/skins", ensureAuthenticated, getUserSkins);

module.exports = router;
