import { Request, Response } from "express";
import CartModel from "../models/CartModel";
import ProductModel from "../models/ProductModel";

export const getCartItems = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    let cart = await CartModel.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });
    let item = await ProductModel.findOne({ _id: productId });
    let price: number = 0;
    let name: string = "item not found";
    if (!item) {
      res.status(404).send("Item not found!");
    } else {
      price = item.price;
      name = item.title;
    }

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({
          productId,
          name,
          quantity,
          price,
          img_url: item?.img_url,
        });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await CartModel.create({
        userId,
        items: [{ productId, name, quantity, price, img_url: item?.img_url }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { productId, qty } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });
    let item = await ProductModel.findOne({ _id: productId });

    if (!item) return res.status(404).send("Item not found!"); // not returning will continue further execution of code.

    if (!cart) return res.status(400).send("Cart not found");
    else {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex == -1)
        return res.status(404).send("Item not found in cart!");
      else {
        let productItem = cart.items[itemIndex];
        productItem.quantity = qty;
        productItem.img_url = item?.img_url;
        cart.items[itemIndex] = productItem;
      }
      cart.bill = cart.items.reduce(
        //@ts-ignore
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    // just printing the error wont help us find where is the error. Add some understandable string to it.
    console.log("Error in update cart", err);
    res.status(500).send("Something went wrong");
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await CartModel.findOne({ userId });
    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        if (productItem) {
          //@ts-ignore
          cart.bill -= productItem.quantity * productItem.price;
          cart.items.splice(itemIndex, 1);
        } else console.log("cart item not found");
      } else console.log("cart not found");
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
