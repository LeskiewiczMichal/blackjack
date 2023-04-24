"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Authenticated");
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};
exports.ensureAuthenticated = ensureAuthenticated;
