import express from "express";
import AuthModel from "../models/AuthModel";
import { BadRequestError } from "../helpers/expressError";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";
import jwt from "jsonwebtoken";
import userAuthSchema from "../schemas/userAuth.json";

const router = express.Router();

router.post("/login", async (req, res) => {
  //validate
  const validator = jsonschema.validate(req.body, userAuthSchema);

  if (!validator.valid) {
    const errs = cleanUpErrorMesssages(validator.errors);

    throw new BadRequestError(errs);
  }

  const { email, password } = req.body;

  //authenticate
  const user = await AuthModel.authenticate(email, password);

  //creates my payload
  let payload = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    isadmin: user.isadmin,
  };

  console.log("payload", payload);
  //creates  token
  const secretKey = process.env.SECRET_KEY || "dog";
  const token = jwt.sign(payload, secretKey);

  //return token
  return res.json({ token });
});
