import express, { Request, Response } from "express";
import Category, { CategoryInterface } from "../models/CategoryModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const listOfCategories: CategoryInterface[] =
    await Category.getAllCategories();
  res.json({
    message: "A list of all categories",
    data: listOfCategories,
  });
});

router.post("/", async (req: Request, res: Response) => {
  const categoryData = req.body;
  const category = await Category.createCategory(categoryData);
  res.status(201).json({
    message: "A Category was created!",
    data: category,
  });
});

export default router;
