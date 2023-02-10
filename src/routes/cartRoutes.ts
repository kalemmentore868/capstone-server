import { Router } from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController";
import { ensureLoggedIn } from "../middleware/auth";

const router = Router();

router.get("/:id", ensureLoggedIn, getCartItems);
router.post("/:id", ensureLoggedIn, addCartItem);
router.put("/:id", ensureLoggedIn, updateCartItem);
router.delete("/:userId/:itemId", ensureLoggedIn, deleteCartItem);

export default router;
