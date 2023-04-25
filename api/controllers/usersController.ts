import { Request, Response } from "express";

import passport from "passport";
import { User, UserInterface } from "../models/userDetails";

const getUserData = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await User.findById(user._id).exec();
    return res.json({ user: userData });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req: Request, res: Response) => {
  (User as any).register(
    new User({
      username: req.body.username,
      email: req.body.email,
      balance: 1000,
      ownedSkins: [],
      activeSkins: [],
    }),
    req.body.password,
    (err: any, user: UserInterface) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate("local")(req, res, () => {
        res.status(200).json({ message: "Registration successful" });
      });
    }
  );
};

const updateBalance = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = (await User.findById(user._id).exec()) as UserInterface;
    userData.balance = req.body.balance;
    await userData.save();
    return res.json({ user: userData });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;
  await user.populate("activeSkins");
  await user.populate("ownedSkins");
  res.json({ user });
};

const logoutUser = async (req: Request, res: Response) => {
  req.logout(() => {});
  res.json({ message: "Logout successful" });
};

const getUserSkins = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;

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
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const goBancrupt = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = (await User.findById(user._id).exec()) as UserInterface;
    userData.balance = 1000;
    userData.activeSkins = [];
    await userData.save();
    return res.json({ user: userData });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export { getUserData, register, updateBalance, login, logoutUser, getUserSkins, goBancrupt };
