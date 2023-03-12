import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import { ExpressError, NotFoundError } from "./helpers/expressError";
import { authenticateJWT } from "./middleware/auth";

const app = express();

app.use(express.json());

app.use(cors());

app.use(authenticateJWT);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);

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
