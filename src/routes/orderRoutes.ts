import { Router } from "express";
import { checkout, getOrders } from "../controllers/orderController";
import { ensureLoggedIn } from "../middleware/auth";

const router = Router();

router.get("/:id", getOrders);
router.post("/:id", ensureLoggedIn, checkout);

export default router;
