import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";

import { fetchHistories } from "../../controllers/histories";

const router = Router();

router.get("/", authMiddleware({ required: false }), fetchHistories);

export default router;
