import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  getAll,
  getById,
  buy,
  activate,
  deactivate,
} from "../controllers/skinsController";

const router = Router();

// Get skins
router.get("/", getAll);

// Get skin by id
router.get("/:id", getById);

// Buy skin
router.post("/buy/:id", ensureAuthenticated, buy);

// Activate skin
router.post("/activate/:id", ensureAuthenticated, activate);

// Deactivate skin
router.post("/deactivate/:id", ensureAuthenticated, deactivate);

export { router as skinsRouter };
