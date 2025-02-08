import express, { Request, Response } from "express";
import { ProfileController } from "../controllers/profile";

export const profileRouter = express.Router();

profileRouter.get("/", (req: Request, res: Response) => {
  res.send("Profile page");
});

profileRouter.post("/", (req: Request, res: Response) => {
  res.send("Profile page");
});
