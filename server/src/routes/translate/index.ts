import { Router } from "express";
import { getOpenaiResponse } from "../../controllers/translate";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.post("/", authMiddleware({ required: false }), getOpenaiResponse);

export default router;
