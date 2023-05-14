import { Request, Response } from "express";
import AddressModel, { AddressType } from "../models/AddressModel";
import addressCreateSchema from "../schemas/addressCreate.json";
import addressUpdateSchema from "../schemas/addressUpdate.json";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import cleanUpErrorMessages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";
import UserModel from "../models/UserModel";

export const getAllAddresses = async (req: Request, res: Response) => {
  const listOfAddresses: AddressType[] = await AddressModel.getAllAddresses();
  res.json({
    message: "A list of all addresses",
    data: listOfAddresses,
  });
};

export const getSingleAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const address = await AddressModel.getAddress(id);

  if (!address) {
    throw new NotFoundError(`Address with id: ${id} cannot be found`);
  } else {
    res.json({
      message: `Address with id: ${id}`,
      data: address,
    });
  }
};

export const getAllAddressesByUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const listOfAddresses: AddressType[] = await AddressModel.getAddressByUser(
    id
  );

  const fetchedUser = await UserModel.getUser(id);

  if (!fetchedUser) {
    throw new NotFoundError(`User with id: ${id} cannot be found`);
  }

  if (!listOfAddresses || listOfAddresses.length === 0) {
    throw new NotFoundError(`No addresses found for user with id: ${id}`);
  } else {
    res.json({
      message: `List of all addresses for user with id: ${id}`,
      data: listOfAddresses,
    });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const addressData: AddressType = req.body;

  const fetchedUser = await UserModel.getUser(id);

  if (!fetchedUser) {
    throw new NotFoundError(`User with id: ${id} cannot be found`);
  }

  const validator = jsonschema.validate(addressData, addressCreateSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMessages(validator.errors);
    throw new BadRequestError(errs);
  }

  const address = await AddressModel.createAddress(addressData, id);

  res.status(201).json({
    message: "Address created successfully",
    data: address,
  });
};

export const updateAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user_id = parseInt(req.params.user_id);
  const addressData: AddressType = req.body;

  const fetchedUser = await UserModel.getUser(user_id);

  if (!fetchedUser) {
    throw new NotFoundError(`User with id: ${user_id} cannot be found`);
  }

  const fetchedAddress = await AddressModel.getAddress(id);

  if (!fetchedAddress) {
    res.status(404).json({
      message: `Address with id: ${id} cannot be found`,
    });
  } else {
    const validator = jsonschema.validate(addressData, addressUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMessages(validator.errors);
      throw new BadRequestError(errs);
    }

    const address = (await AddressModel.updateAddress(
      addressData,
      id,
      user_id
    )) || {
      id: "not found",
    };

    res.json({
      message: `Address with id: ${address.id} was updated`,
      data: address,
    });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user_id = parseInt(req.params.user_id);
  console.log("yo");
  const fetchedUser = await UserModel.getUser(user_id);
  if (!fetchedUser) {
    throw new NotFoundError(`User with id: ${user_id} cannot be found`);
  }
  const fetchedAddress = await AddressModel.getAddress(id);

  if (!fetchedAddress) {
    res.status(404).json({
      message: `Address with id: ${id} cannot be found`,
    });
  } else {
    await AddressModel.deleteAddress(id, user_id);
    res.json({
      message: `Address with id: ${id} was deleted`,
    });
  }
};
