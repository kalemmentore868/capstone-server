import express, { request, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import categoryController from "./controllers/categoryController";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/categories", categoryController);

app.listen(process.env.PORT, () => {
  console.log(`API is up and running on Port ${process.env.PORT}`);
});
