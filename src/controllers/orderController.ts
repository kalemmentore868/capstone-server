import { Request, Response } from "express";
import CartItemModel, { CartItemType } from "../models/CArtItemModel";
import CartModel, { CartType } from "../models/CartModel";
import OrderItemModel, { OrderItemType } from "../models/OrderItemModel";
import OrderModel, { OrderType } from "../models/OrderModel";
import UserModel from "../models/UserModel";
import { getOrdersAsString } from "../helpers/formatOrderEmail";
import { sendEmail, sendEmailHtml } from "../helpers/sendEmail";
import { getOrderObj } from "../helpers/orderHelper";

export const getAllOrdersInDb = async (req: Request, res: Response) => {
  const orders: OrderType[] = await OrderModel.getAllOrders();

  if (orders.length <= 0) {
    res.json({
      message: "No orders",
    });
  } else {
    const listOfOrderObj = [];

    for (const order of orders) {
      const orderItems: OrderItemType[] =
        await OrderItemModel.getAllItemsFromOrder(order.id);

      const orderObj = await getOrderObj(
        orderItems,
        order.created_at,
        order.id
      );
      listOfOrderObj.push(orderObj);
    }

    if (listOfOrderObj.length <= 0) {
      res.json({
        message: "No orders",
      });
    } else {
      res.json({
        message: "a list of all ordered items and total",
        data: listOfOrderObj,
      });
    }
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const orders: OrderType[] = await OrderModel.getAllUsersOrders(userId);

  if (orders.length <= 0) {
    res.json({
      message: "No orders",
    });
  } else {
    const listOfOrderObj = [];

    for (const order of orders) {
      const orderItems: OrderItemType[] =
        await OrderItemModel.getAllItemsFromOrder(order.id);

      const orderObj = await getOrderObj(
        orderItems,
        order.created_at,
        order.id
      );
      listOfOrderObj.push(orderObj);
    }

    if (listOfOrderObj.length <= 0) {
      res.json({
        message: "No orders",
      });
    } else {
      res.json({
        message: "a list of all ordered items and total",
        data: listOfOrderObj,
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
      const order: OrderType = await OrderModel.createOrder(orderObj);

      for (let i = 0; i < cartItems.length; i++) {
        const cartItem: CartItemType = cartItems[i];
        await OrderItemModel.createOrderItem(
          order.id,
          cartItem.product_id,
          cartItem.quantity
        );
        await CartItemModel.deleteCartItem(cartItem.id);
      }

      let orderedItems = await getOrdersAsString(order.id);
      const subject = `Order made #${order.id}`;
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Purchase</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #000000;
      margin: 0;
      padding: 0;
    }
    .container {
    
      padding: 20px;
      border-radius: 10px;
      color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
    }
    h2 {
      margin-top: 0;
     background-color: #60be74;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      text-align: left;
      padding: 8px 0;
      font-size: 14px;
    }
    th {
      font-weight: bold;
    }
    .total {
      font-weight: bold;
    }
    .notes {
      margin-top: 20px;
       font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank You for Your Purchase!</h1>
    <table>
      ${orderedItems}
    </table>
    <p class="notes">Notes: ${notes}</p>
  </div>
</body>
</html>
`;
      sendEmailHtml(email, subject, html);
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
