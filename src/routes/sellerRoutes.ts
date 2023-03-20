import { Router } from "express";
import {
  deleteSeller,
  getAllSellers,
  getOneSeller,
  createSeller,
  updateSeller,
} from "../controllers/sellerController";
import { ensureAdmin, ensureCorrectUserOrAdmin } from "../middleware/auth";

const router = Router();

router.get(
  "/",
  //ensureAdmin,
  getAllSellers
);
router.post("/", ensureCorrectUserOrAdmin, createSeller);
router.get("/:id", ensureCorrectUserOrAdmin, getOneSeller);
router.put("/:id", ensureCorrectUserOrAdmin, updateSeller);
router.delete("/:id", ensureCorrectUserOrAdmin, deleteSeller);

export default router;
