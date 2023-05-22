import { Router } from "express";
import {
  login,
  signup,
  sellerLogin,
  adminSignup,
} from "../controllers/authController";
import { ensureAdmin } from "../middleware/auth";

const router = Router();

router.post("/register", signup);
router.post("/register-admin", ensureAdmin, adminSignup);
router.post("/login", login);
router.post("/seller-login", sellerLogin);

export default router;
