import { Request, Response } from "express";
import CartItemModel, { CartItemType } from "../models/CartItemModel";
import CartModel, { CartType } from "../models/CartModel";
import OrderItemModel, { OrderItemType } from "../models/OrderItemModel";
import OrderModel, { OrderType } from "../models/OrderModel";
import UserModel from "../models/UserModel";
import { getOrdersAsString } from "../helpers/formatOrderEmail";
import { sendEmail, sendEmailHtml } from "../helpers/sendEmail";
import { getOrderObj } from "../helpers/orderHelper";
import { AddressType } from "../models/AddressModel";

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
    const address: AddressType = req.body.address;

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
      const text = `Thank you for your order. Here is the order details: ${orderedItems}
      notes: ${notes}
      address: #${address.house_number}, ${address.street}, ${address.city}
`;
      sendEmail(email, subject, text);
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
