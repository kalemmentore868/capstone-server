import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { BadRequestError, NotFoundError } from "../helpers/expressError";

import userUpdateSchema from "../schemas/userUpdateSchema.json";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export const getAllUsers = async (req: Request, res: Response) => {
  const listOfUsers: User[] = await UserModel.getAllUsers();

  res.json({
    message: "A list of all the users",
    data: listOfUsers,
  });
};

export const getOneUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const user = await UserModel.getUser(id);

  if (!user) {
    throw new NotFoundError(`User with id :${id} cannot be found`);
  } else {
    res.json({
      message: `User with id ${id}`,
      data: user,
    });
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let fetchedUser = await UserModel.getUser(id);

  if (!fetchedUser) {
    res.status(404).json({
      message: `User with id :${id} cannot be found`,
    });
  } else {
    const validator = jsonschema.validate(req.body, userUpdateSchema);

    if (!validator.valid) {
      const errs = cleanUpErrorMesssages(validator.errors);

      throw new BadRequestError(errs);
    }

    const userData = {
      first_name: req.body.first_name
        ? req.body.first_name
        : fetchedUser.first_name,
      last_name: req.body.last_name
        ? req.body.last_name
        : fetchedUser.last_name,
    };

    // @ts-ignore
    const user = await UserModel.updateUser(userData, id);

    res.json({
      //@ts-ignore
      message: `User with id ${user.id} was updated`,
      data: user,
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const user = await UserModel.getUser(id);

  if (!user) {
    res.status(404).json({
      message: `User with id :${id} cannot be found`,
    });
  } else {
    await UserModel.deleteUser(id);
    res.json({
      message: `User with id ${id} was deleted`,
    });
  }
};
