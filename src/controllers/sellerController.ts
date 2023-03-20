import { Request, Response } from "express";
import SellerModel, { SellerType } from "../models/SellerModel";
import sellerUpdateSchema from "../schemas/sellerUpdate.json";
import jsonschema from "jsonschema";
import sellerRegisterSchema from "../schemas/sellerRegister.json";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import jwt from "jsonwebtoken";

export const createSeller = async (req: Request, res: Response) => {
  const sellerData = req.body;

  const validator = jsonschema.validate(sellerData, sellerRegisterSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const foundSeller = await SellerModel.getSellerByEmail(sellerData.email);

  if (foundSeller) {
    throw new BadRequestError(
      `Sorry the email ${req.body.email} already exists`
    );
  }

  const seller: SellerType = await SellerModel.createSeller(sellerData); // create

  const { id, email, address, opening_hours, phone_no } = seller;
  const SECRET_KEY = process.env.SECRET_KEY || "dog";
  const token = jwt.sign(
    {
      id,
      email,
      address,
      opening_hours,
      phone_no,
    },
    SECRET_KEY
  );

  res.status(201).json({
    message: "A Seller was created!",
    data: {
      id,
      email,
      address,
      opening_hours,
      phone_no,
      token,
    },
  });
};

export const getAllSellers = async (req: Request, res: Response) => {
  const listOfSellers: SellerType[] = await SellerModel.getAllSellers();
  res.json({
    message: "A list of all sellers",
    data: listOfSellers,
  });
};

export const getOneSeller = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const seller = await SellerModel.getSeller(id);

  if (!seller) {
    throw new NotFoundError(`Product with id : ${id} cannot be found`);
  } else {
    res.json({
      message: "Seller with id: " + id,
      data: seller,
    });
  }
};

export const updateSeller = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const fetchedSeller = await SellerModel.getSeller(id);

  if (!fetchedSeller) {
    res.status(404).json({
      message: `Product with id: ${id} cannot be found`,
    });
  } else {
    const validator = jsonschema.validate(req.body, sellerUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMesssages(validator.errors);
      throw new BadRequestError(errs);
    }

    const seller = (await SellerModel.updateSeller(req.body, id)) || {
      id: "not found",
    };
    res.json({
      message: `Product with id ${seller.id} was updated`,
      data: seller,
    });
  }
};

export const deleteSeller = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fetchedSeller = await SellerModel.getSeller(id);

  if (!fetchedSeller) {
    res.status(404).json({
      message: `Seller with id: ${id} cannot be found`,
    });
  } else {
    await SellerModel.deleteSeller(id);
    res.json({
      message: `Seller with id: ${id} was deleted`,
    });
  }
};
