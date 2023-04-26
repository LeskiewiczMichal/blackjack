"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoDB = process.env.MONGODB_URI || process.env.DB_CONNECTION;
const mongoDB = "mongodb+srv://leskiewicz02robocze:blackjack@cluster0.bj62xhx.mongodb.net/?retryWrites=true&w=majority";
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoDB) {
        throw new Error("DB_CONNECTION environment variable not set");
    }
    try {
        yield mongoose_1.default.connect(mongoDB);
    }
    catch (error) {
        console.error.bind(console, "mongo connection error");
    }
});
exports.connectToMongoDB = connectToMongoDB;
