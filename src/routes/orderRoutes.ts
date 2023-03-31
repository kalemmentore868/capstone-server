import { Router } from "express";
import { checkout, getOrders } from "../controllers/orderController";
import {
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
  ensureAdmin,
} from "../middleware/auth";

const router = Router();

router.get("/:id", ensureAdmin, getOrders);
router.post("/:id", ensureCorrectUserOrAdmin, checkout);

export default router;
