require("dotenv").config();
import express from "express";
import cors from "cors";
import path from "path";

import { connectToMongoDB } from "./middleware/connectToMongoDB";
import { setUpSession } from "./middleware/setUpSession";
import { passportConfig } from "./middleware/passportConfig";
import { usersRouter } from "./routes/users";
import { skinsRouter } from "./routes/skins";

connectToMongoDB(); // Database

const app = express();
const PORT = process.env.PORT || 9000;

// CORS for my localhost
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

// Middleware
app.use(cors());
app.use(setUpSession);
app.use(passportConfig);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use("/users", usersRouter);
app.use("/skins", skinsRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
