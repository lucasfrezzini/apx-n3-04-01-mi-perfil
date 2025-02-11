import express, { Request, Response } from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import { Profile } from "./models/profile";

import { profileRouter } from "./views/profileRouter";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// User.sync({ force: true });
// Auth.sync({ force: true });
// Product.sync({ force: true });
// Profile.sync({ force: true });

app.use("/profile", profileRouter);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
