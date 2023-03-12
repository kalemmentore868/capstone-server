import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { BadRequestError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userAuthSchema from "../schemas/userAuth.json";
import userRegisterSchema from "../schemas/userRegister.json";
import adminRegisterSchema from "../schemas/adminRegister.json";

export const login = async (req: Request, res: Response) => {
  //validate
  const validator = jsonschema.validate(req.body, userAuthSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const { email, password } = req.body;

  //authenticate
  const user = await UserModel.getUserByEmail(email);

  if (!user) {
    res.json({ message: "Username or password is incorrect" });
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      res.json({ message: "Username or password is incorrect" });
    } else {
      const SECRET_KEY = process.env.SECRET_KEY || "dog";
      const token = jwt.sign(
        {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          is_admin: user.is_admin,
        },
        SECRET_KEY
      );
      res.json({
        message: "login successful",
        data: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          is_admin: user.is_admin,
          token,
        },
      });
    }
  }
};

export const signup = async (req: Request, res: Response) => {
  const userData = req.body;

  const validator = jsonschema.validate(req.body, userRegisterSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);
    throw new BadRequestError(errs);
  }

  const foundUser = await UserModel.getUserByEmail(userData.email);
  console.log("where");
  if (foundUser) {
    throw new BadRequestError(
      `Sorry the email ${req.body.email} already exists`
    );
  }

  const user = await UserModel.createUser(userData); // create

  const SECRET_KEY = process.env.SECRET_KEY || "dog";
  const token = jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
    },
    SECRET_KEY
  );

  res.status(201).json({
    message: "A User was created!",
    data: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
      token,
    },
  });
};

export const adminSignup = async (req: Request, res: Response) => {
  const userData = req.body;

  const validator = jsonschema.validate(req.body, adminRegisterSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);
    throw new BadRequestError(errs);
  }

  const foundUser = await UserModel.getUserByEmail(userData.email);

  if (foundUser) {
    throw new BadRequestError(
      `Sorry the email ${req.body.email} already exists`
    );
  }

  const user = UserModel.createUser(userData);

  console.log("User", user);
  res.status(201).json({
    message: "An Admin User was created!",
    data: user,
  });
};
