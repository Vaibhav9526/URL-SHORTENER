import express from "express";
import type { Request, Response } from "express";
import { existingUserEmail } from "../middleware/existing_user.middleware.ts";
import { signUp, signIn } from "../controllers/user.controller.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(400).json({ error: "invalid session id" });
  if (user.role === "admin") return res.status(200).json("success");
  res.status(200).json(user);
});

router.post("/signup", existingUserEmail, signUp);
router.post("/signin", signIn);

export default router;
