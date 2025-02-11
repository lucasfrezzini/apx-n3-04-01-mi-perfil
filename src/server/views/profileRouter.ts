import express, { Request, Response } from "express";
import { ProfileController } from "../controllers/profile";

export const profileRouter = express.Router();

profileRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid id");
    }
    const profile = await ProfileController.getProfile(id);
    res.send(profile);
  } catch (error) {
    res.status(401).send(error);
  }
});

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const profile = req.body;
    const uploadResult = await ProfileController.postProfile(profile);
    console.log(uploadResult);
    res.send(uploadResult);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
