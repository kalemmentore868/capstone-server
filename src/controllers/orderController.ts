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
      const text = `

      <!DOCTYPE html>
<html>
<head>
  <title>Order Confirmation</title>
  <style>
    /* Add your custom CSS styles here */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f2f2f2;
    }
    .product {
      display: flex;
      margin-bottom: 20px;
    }
    .product img {
      width: 100px;
      height: auto;
      margin-right: 10px;
    }
    .product-info {
      flex-grow: 1;
    }
    .product-title {
      font-weight: bold;
      margin: 0;
    }
    .product-desc {
      margin: 5px 0;
    }
    .product-price {
      font-weight: bold;
    }
    .product-quantity {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
div class="container">
    <h2>Order Confirmation</h2>
    <h3>Thank you for your order!</h3>
     
      <p>Order made by: ${user.first_name} ${user.last_name}</p>
      <p>Address: ${address.street} ${address.house_number}, ${address.city}
      
      ${orderedItems}
      
      <p>Sub Total: ${order.total}</p>
      <p>Shipping: $${15}</p>
      <p>Total: ${(order.total + 15).toFixed(2)}</p>
      
      <p>Notes: ${notes}</p>
      <p>Order made at: ${order.created_at}

      </div>
</body>
</html>
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
