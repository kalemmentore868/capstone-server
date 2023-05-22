import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  getAllAddressesByUser,
} from "../controllers/addressController";
import { ensureAdmin, ensureCorrectUserOrAdmin } from "../middleware/auth";

const router = Router();

router.get("/", ensureAdmin, getAllAddresses);
router.get("/users/:id", ensureCorrectUserOrAdmin, getAllAddressesByUser);
router.get("/:id", ensureCorrectUserOrAdmin, getSingleAddress);
router.post("/:id", ensureCorrectUserOrAdmin, createAddress);
router.put("/:userId/:id", ensureCorrectUserOrAdmin, updateAddress);
router.delete("/:userId/:id", ensureCorrectUserOrAdmin, deleteAddress);

export default router;
