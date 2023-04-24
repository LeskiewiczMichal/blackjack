import { Router } from "express";
import passport from "passport";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  getUserData,
  register,
  updateBalance,
  login,
  logoutUser,
  getUserSkins,
} from "../controllers/usersController";

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
router.post("/logout", logoutUser);

// Get user skins
router.get("/skins", ensureAuthenticated, getUserSkins);


export { router as usersRouter };

