"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skinsRouter = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../middleware/ensureAuthenticated");
const skinsController_1 = require("../controllers/skinsController");
const router = (0, express_1.Router)();
exports.skinsRouter = router;
// Get skins
router.get("/", skinsController_1.getAll);
// Get skin by id
router.get("/:id", skinsController_1.getById);
// Buy skin
router.post("/buy/:id", ensureAuthenticated_1.ensureAuthenticated, skinsController_1.buy);
// Activate skin
router.post("/activate/:id", ensureAuthenticated_1.ensureAuthenticated, skinsController_1.activate);
// Deactivate skin
router.post("/deactivate/:id", ensureAuthenticated_1.ensureAuthenticated, skinsController_1.deactivate);
