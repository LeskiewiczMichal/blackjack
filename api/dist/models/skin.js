"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skin = void 0;
const mongoose_1 = require("mongoose");
// Create user schema
const skinSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
});
const Skin = (0, mongoose_1.model)("Skin", skinSchema);
exports.Skin = Skin;
