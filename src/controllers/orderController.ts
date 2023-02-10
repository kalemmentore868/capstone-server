import { Request, Response } from "express";
import CartModel from "../models/CartModel";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";
import PaymentModel from "../models/PaymentModel";

export const getOrders = async (req: Request, res: Response) => {
  const userId = req.params.id;
  OrderModel.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const paymentData = req.body;
    paymentData.userId = userId;

    const newPayment = await PaymentModel.create(paymentData);
    await newPayment.save();
    res.json({
      message: "payment successful",
      data: newPayment,
    });
    //put code here to clear the cart and send an email

    // let cart = await CartModel.findOne({ userId });
    // let user = await UserModel.findOne({ _id: userId });
    // const email = user?.email;
    // if (cart) {
    //   const charge = await stripe.charges.create({
    //     amount: cart.bill,
    //     currency: "inr",
    //     source: source,
    //     receipt_email: email,
    //   });
    //   if (!charge) throw Error("Payment failed");
    //   if (charge) {
    //     const order = await Order.create({
    //       userId,
    //       items: cart.items,
    //       bill: cart.bill,
    //     });
    //     const data = await Cart.findByIdAndDelete({ _id: cart.id });
    //     return res.status(201).send(order);
    //   }
    // } else {
    //   res.status(500).send("You do not have items in cart");
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
