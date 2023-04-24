import { Request, Response } from "express";
import UserModel, { UserType } from "../models/UserModel";
import { BadRequestError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userAuthSchema from "../schemas/userAuth.json";
import userRegisterSchema from "../schemas/userRegister.json";
import adminRegisterSchema from "../schemas/adminRegister.json";
import SellerModel from "../models/SellerModel";
import { sendEmail } from "../helpers/sendEmail";

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
      const { id, first_name, last_name, email, is_admin, phone_number } = user;
      const SECRET_KEY = process.env.SECRET_KEY || "dog";
      const token = jwt.sign(
        {
          id,
          first_name,
          last_name,
          email,
          is_admin,
          phone_number,
        },
        SECRET_KEY
      );
      res.json({
        message: "login successful",
        data: {
          id,
          first_name,
          last_name,
          email,
          is_admin,
          phone_number,
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
    console.log(errs);
    throw new BadRequestError(errs);
  }

  const foundUser = await UserModel.getUserByEmail(userData.email);

  if (foundUser) {
    throw new BadRequestError(
      `Sorry the email ${req.body.email} already exists`
    );
  }

  userData.is_admin = false;

  const user: UserType = await UserModel.createUser(userData); // create

  const { id, first_name, last_name, email, is_admin, phone_number } = user;

  sendEmail(
    email,
    `Welcome ${first_name} ${last_name}`,
    "Thanks for signing up!"
  );

  const SECRET_KEY = process.env.SECRET_KEY || "dog";
  const token = jwt.sign(
    {
      id,
      first_name,
      last_name,
      email,
      is_admin,
      phone_number,
    },
    SECRET_KEY
  );

  res.status(201).json({
    message: "A User was created!",
    data: {
      id,
      first_name,
      last_name,
      email,
      is_admin,
      phone_number,
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

export const sellerLogin = async (req: Request, res: Response) => {
  //validate
  const validator = jsonschema.validate(req.body, userAuthSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const { email, password } = req.body;

  //authenticate
  const seller = await SellerModel.getSellerByEmail(email);

  if (!seller) {
    res.json({ message: "Username or password is incorrect" });
  } else {
    if (!bcrypt.compareSync(password, seller.password)) {
      res.json({ message: "Username or password is incorrect" });
    } else {
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
      res.json({
        message: "login successful",
        data: {
          id,
          email,
          address,
          opening_hours,
          phone_no,
          token,
        },
      });
    }
  }
};
