import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getMe,
} from "../../controllers/user";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", authMiddleware(), logoutUser);
router.get("/me", authMiddleware(), getMe);

export default router;
