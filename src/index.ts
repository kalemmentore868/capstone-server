import express, { NextFunction, request, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import categoryController from "./controllers/categoryController";
import userController from "./controllers/userController";
import { ExpressError, NotFoundError } from "./helpers/expressError";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/categories", categoryController);
app.use("/api/users", userController);

app.use(function (req: Request, res: Response, next: NextFunction) {
  throw new NotFoundError();
});

app.use(function (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`API is up and running on Port ${process.env.PORT}`);
});
