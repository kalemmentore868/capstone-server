import { Router } from "express";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
} from "../controllers/userController";
import { ensureAdmin, ensureCorrectUserOrAdmin } from "../middleware/auth";

const router = Router();

router.get("/", ensureAdmin, getAllUsers);
router.get("/:id", ensureCorrectUserOrAdmin, getOneUser);
router.put("/:id", ensureCorrectUserOrAdmin, updateOneUser);
router.delete("/:id", ensureCorrectUserOrAdmin, deleteOneUser);

export default router;
