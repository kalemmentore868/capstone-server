import express, { Request, Response } from "express";
import UserModel from "../models/UserModels";
import { BadRequestError, NotFoundError } from "../helpers/expressError";
import {
  ensureAdmin,
  ensureCorrectUserOrAdmin,
  ensureLoggedIn,
} from "../middleware/auth";
import userRegisterSchema from "../schemas/userRegister.json";
import userUpdateSchema from "../schemas/userUpdateSchema.json";
import adminRegisterSchema from "../schemas/adminRegister.json";
import cleanUpErrorMesssages from "../helpers/jsonSchemaHelper";
import jsonschema from "jsonschema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const listOfUsers = await UserModel.getAllUsers();
  res.json({
    message: "A list of all the users",
    data: listOfUsers,
  });
});

router.get(
  "/:id",
  ensureCorrectUserOrAdmin,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const user = await UserModel.getUserById(id);

    if (!user) {
      throw new NotFoundError(`User with id :${id} cannot be found`);
    } else {
      res.json({
        message: `User with id ${id}`,
        data: user,
      });
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  const userData = req.body;

  const validator = jsonschema.validate(req.body, userRegisterSchema);

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

  const user = await UserModel.createUser(userData); // create
  res.status(201).json({
    message: "A User was created!",
    data: user,
  });
});

router.post("/admin", ensureAdmin, async (req: Request, res: Response) => {
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

  const user = await UserModel.createAdminUser(userData); // create

  console.log("User", user);
  res.status(201).json({
    message: "An Admin User was created!",
    data: user,
  });
});

router.patch(
  "/:id",
  ensureCorrectUserOrAdmin,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let fetchedUser = await UserModel.getUserById(id);

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

      const user = await UserModel.updateUser(userData, id);

      res.json({
        message: `User with id ${user.id} was updated`,
        data: user,
      });
    }
  }
);

router.delete("/:id", ensureCorrectUserOrAdmin, async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await UserModel.getUserById(id);

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
});

export default router;
