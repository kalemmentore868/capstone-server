import { Router } from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController";
import { ensureCorrectUserOrAdmin } from "../middleware/auth";

const router = Router();

router.get("/:id", ensureCorrectUserOrAdmin, getCartItems);
router.post("/:id", ensureCorrectUserOrAdmin, addCartItem);
router.put("/:id", ensureCorrectUserOrAdmin, updateCartItem);
router.delete("/:userId/:itemId", ensureCorrectUserOrAdmin, deleteCartItem);

export default router;
