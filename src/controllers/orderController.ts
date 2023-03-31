import { Request, Response } from "express";
import CartItemModel, { CartItemType } from "../models/CArtItemModel";
import CartModel, { CartType } from "../models/CartModel";
import OrderItemModel, { OrderItemType } from "../models/OrderItemModel";
import OrderModel, { OrderType } from "../models/OrderModel";
import UserModel from "../models/UserModel";
import nodemailer from "nodemailer";
import { getOrdersAsString } from "../helpers/formatOrderEmail";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const getOrders = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const order: OrderType = await OrderModel.getOrderByUserId(userId);

  if (!order) {
    res.json({
      message: "No orders",
    });
  } else {
    const orderItems: OrderItemType[] =
      await OrderItemModel.getAllItemsFromOrder(order.id);
    if (orderItems.length <= 0) {
      res.json({
        message: "No orders",
      });
    } else {
      res.json({
        message: "a list of all ordered items and total",
        data: {
          orderItems,
          total: order.total,
        },
      });
    }
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const notes = req.body.notes;

    let cart: CartType = await CartModel.getCartByUserId(userId);
    let user = await UserModel.getUser(userId);
    const email = user.email;
    if (cart) {
      const cartItems = await CartItemModel.getAllCartItemsInCart(cart.id);
      const orderObj = {
        user_id: userId,
        total: cart.total,
        notes,
      };
      // @ts-ignore
      const order = await OrderModel.createOrder(orderObj);

      for (let i = 0; i < cartItems.length; i++) {
        const cartItem: CartItemType = cartItems[i];
        await OrderItemModel.createOrderItem(
          order.id,
          cartItem.product_id,
          cartItem.quantity
        );
        await CartItemModel.deleteCartItem(cartItem.id);
      }

      let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: `Order made #${order.id}`,
        text: await getOrdersAsString(order.id),
      };

      try {
        const emailRes = await transporter.sendMail(mailOptions);
        console.log("message sent", emailRes.messageId);
      } catch (error) {
        console.log(error);
      }
      await CartModel.deleteCart(cart.id);
      return res.status(201).json({ message: "Order made" });
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
