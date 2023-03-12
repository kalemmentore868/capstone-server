import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
