import { Router } from "express";
import { login, signup, sellerLogin } from "../controllers/authController";
import { ensureAdmin } from "../middleware/auth";

const router = Router();

router.post("/register", signup);
router.post(
  "/register-admin",
  //ensureAdmin,
  signup
);
router.post("/login", login);
router.post("/seller-login", sellerLogin);

export default router;
