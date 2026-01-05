import { Router } from "express";
import { getLanguages } from "../../controllers/languages";

const router = Router();

router.get("/", getLanguages);

export default router;
