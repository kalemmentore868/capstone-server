import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { ensureAdmin } from "../middleware/auth";

const router = Router();

router.post("/register", signup);
router.post("/register-admin", ensureAdmin, signup);
router.post("/login", login);

export default router;
