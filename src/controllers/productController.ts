import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import productCreateSchema from "../schemas/productCreate.json";
import productUpdateSchema from "../schemas/productUpdate.json";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";

interface Product {
  title: string;
  description: string;
  price: number;
  img_url: string;
}

export const getAllProducts = async (req: Request, res: Response) => {
  const listOfProducts: Product[] = await ProductModel.find({});
  res.json({
    message: "A list of all products",
    data: listOfProducts,
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await ProductModel.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError(`Product with id : ${id} cannot be found`);
  } else {
    res.json({
      message: "Product with id: " + id,
      data: product,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  const validator = jsonschema.validate(productData, productCreateSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const product = new ProductModel(productData);
  await product.save();

  res.status(201).json({
    message: "A Product was created!",
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const fetchedProduct = await ProductModel.findOne({ _id: id });

  if (!fetchedProduct) {
    res.status(404).json({
      message: `Product with id: ${id} cannt be found`,
    });
  } else {
    const validator = jsonschema.validate(req.body, productUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMesssages(validator.errors);
      throw new BadRequestError(errs);
    }

    const product = (await ProductModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    )) || { id: "not found" };
    res.json({
      message: `Product with id ${product.id} was updated`,
      data: product,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const fetchedProduct = await ProductModel.findOne({ _id: id });

  if (!fetchedProduct) {
    res.status(404).json({
      message: `Product with id: ${id} cannt be found`,
    });
  } else {
    await ProductModel.deleteOne({ _id: id });
    res.json({
      message: `Product with id: ${id} was deleted`,
    });
  }
};
