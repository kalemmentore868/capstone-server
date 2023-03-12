import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import { CategoryType } from "../models/CategoryModel";
import categoryCreateSchema from "../schemas/categoryCreate.json";
import categoryUpdateSchema from "../schemas/categoryUpdate.json";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";

export const getAllCategories = async (req: Request, res: Response) => {
  const listOfCategories: CategoryType[] =
    await CategoryModel.getAllCategories();
  res.json({
    message: "A list of all categories",
    data: listOfCategories,
  });
};

export const getSingleCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const category = await CategoryModel.getCategory(id);

  if (!category) {
    throw new NotFoundError(`Category with id : ${id} cannot be found`);
  } else {
    res.json({
      message: "Category with id: " + id,
      data: category,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const categoryData = req.body;

  const validator = jsonschema.validate(categoryData, categoryCreateSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const category = await CategoryModel.createCategory(categoryData);

  res.status(201).json({
    message: "A Category was created!",
    data: category,
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const fetchedCategory = await CategoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Category with id: ${id} cannot be found`,
    });
  } else {
    const validator = jsonschema.validate(req.body, categoryUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMesssages(validator.errors);
      throw new BadRequestError(errs);
    }

    const category = (await CategoryModel.updateCategory(req.body, id)) || {
      id: "not found",
    };
    res.json({
      message: `Product with id ${category.id} was updated`,
      data: category,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fetchedCategory = await CategoryModel.getCategory(id);

  if (!fetchedCategory) {
    res.status(404).json({
      message: `Category with id: ${id} cannt be found`,
    });
  } else {
    await CategoryModel.deleteCategory(id);
    res.json({
      message: `Product with id: ${id} was deleted`,
    });
  }
};
