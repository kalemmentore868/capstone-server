import { Router } from "express";
import {
  checkout,
  getAllOrdersInDb,
  getOrders,
} from "../controllers/orderController";
import { ensureCorrectUserOrAdmin } from "../middleware/auth";

const router = Router();

router.get(
  "/",
  //ensureCorrectUserOrAdmin,
  getAllOrdersInDb
);
router.get("/:id", ensureCorrectUserOrAdmin, getOrders);
router.post("/:id", ensureCorrectUserOrAdmin, checkout);

export default router;
