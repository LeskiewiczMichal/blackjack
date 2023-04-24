const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const Skin = require("../models/skin");
const {
  getAll,
  getById,
  buy,
  activate,
  deactivate,
} = require("../controllers/skinsController");

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

module.exports = router;
