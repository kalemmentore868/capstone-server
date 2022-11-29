import express, { Request, Response } from "express";
import categoryModel, { CategoryInterface } from "../models/CategoryModel";
import { BadRequestError, NotFoundError } from "../helpers/expressError";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const listOfCategories: CategoryInterface[] =
    await categoryModel.getAllCategories();
  res.json({
    message: "A list of all categories",
    data: listOfCategories,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const category = await categoryModel.getCategory(id);

  if (!category) {
    throw new NotFoundError(`Category with id : ${id} cannot be found`);
  } else {
    res.json({
      message: "A list of all categories",
      data: category,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const categoryData = req.body;
  const category = await categoryModel.createCategory(categoryData);
  res.status(201).json({
    message: "A Category was created!",
    data: category,
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const fetchedCategory = await categoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Resort with id: ${id} cannt be found`,
    });
  } else {
    const category = await categoryModel.updateCategory(req.body, id);
    res.json({
      message: `Resort with id ${category.id} was updated`,
      data: category,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fetchedCategory = await categoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Resort with id: ${id} cannt be found`,
    });
  } else {
    await categoryModel.deleteCategory(id);
    res.json({
      message: `Category with id: ${id} was deleted`,
    });
  }
});

export default router;
