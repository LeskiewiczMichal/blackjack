import { Request, Response } from "express";
import { AuthenticatedRequestWithId } from "../types";
import { Skin, SkinInterface } from "../models/skin";
import { UserInterface } from "../models/userDetails";

// Get skins
const getAll = async (req: Request, res: Response) => {
  try {
    const skins = await Skin.find({});
    res.json({ skins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get skin by id
const getById = async (req: Request, res: Response) => {
  try {
    const skin = await Skin.findById(req.params.id);
    res.json( { skin });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Buy skin
const buy = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skin = await Skin.findById(req.params.id);

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

    await user.save();

    await user.populate("activeSkins");
    await user.populate("ownedSkins");

    return res.json({
      ownedSkins: user.ownedSkins,
      activeSkins: user.activeSkins,
      userBalance: user.balance,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Activate skin
const activate = async (req: Request, res: Response) => {
  const user = req.user as AuthenticatedRequestWithId["user"];

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skin = await Skin.findById(req.params.id);

    if (!skin) {
      return res.status(404).json({ message: "Skin not found" });
    }

    // Check if skin of the same category is already in user's active skins
    const activeSkin = await Skin.findOne({
      _id: { $in: user.activeSkins },
      category: skin.category,
    });

    if (activeSkin) {
      // If so, remove it from active skins
      user.activeSkins = user.activeSkins.filter(
        (skin: SkinInterface) => skin.toString() !== activeSkin._id.toString()
      );
    }

    // Add skin to user's active skins
    user.activeSkins.push(skin._id);

    await user.save();

    await user.populate("activeSkins");
    await user.populate("ownedSkins");
    res.json({ ownedSkins: user.ownedSkins, activeSkins: user.activeSkins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate skin
const deactivate = async (req: Request, res: Response) => {
  const user = req.user as AuthenticatedRequestWithId["user"];

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skin = await Skin.findById(req.params.id);

    if (!skin) {
      return res.status(404).json({ message: "Skin not found" });
    }

    // Check if skin of the same category is already in user's active skins
    const activeSkin = await Skin.findOne({
      _id: { $in: user.activeSkins },
      category: skin.category,
    });

    if (activeSkin) {
      // If so, remove it from active skins
      user.activeSkins = user.activeSkins.filter(
        (skin: SkinInterface) => skin.toString() !== activeSkin._id.toString()
      );
    }

    await user.save();

    await user.populate("activeSkins");
    await user.populate("ownedSkins");
    res.json({ ownedSkins: user.ownedSkins, activeSkins: user.activeSkins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getAll, getById, buy, activate, deactivate };
