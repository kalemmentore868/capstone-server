import express, { Request, Response } from "express";
import CategoryModel, { CategoryInterface } from "../models/CategoryModel";
import catergoryCreateSchema from "../schemas/categoryCreate.json";
import catergoryUpdateSchema from "../schemas/categoryUpdate.json";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const listOfCategories: CategoryInterface[] =
    await CategoryModel.getAllCategories();
  res.json({
    message: "A list of all categories",
    data: listOfCategories,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const category = await CategoryModel.getCategory(id);

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

  const validator = jsonschema.validate(categoryData, catergoryCreateSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const category = await CategoryModel.createCategory(categoryData);
  res.status(201).json({
    message: "A Category was created!",
    data: category,
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const fetchedCategory = await CategoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Resort with id: ${id} cannt be found`,
    });
  } else {
    const validator = jsonschema.validate(req.body, catergoryUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMesssages(validator.errors);
      throw new BadRequestError(errs);
    }

    const category = await CategoryModel.updateCategory(req.body, id);
    res.json({
      message: `Resort with id ${category.id} was updated`,
      data: category,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fetchedCategory = await CategoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Resort with id: ${id} cannt be found`,
    });
  } else {
    await CategoryModel.deleteCategory(id);
    res.json({
      message: `Category with id: ${id} was deleted`,
    });
  }
});

export default router;
