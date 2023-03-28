import { Request, Response } from "express";
import CartModel, { CartType } from "../models/CartModel";
import ProductModel, { ProductType } from "../models/ProductModel";
import CartItemModel, { CartItemType } from "../models/CArtItemModel";
import { getCartObj } from "../helpers/cartHelpers";

export const getCartItems = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const cart: CartType = await CartModel.getCartByUserId(userId);

  if (!cart) {
    res.json({
      message: "No Items In Cart",
    });
  } else {
    const cartItems = await CartItemModel.getAllCartItemsInCart(cart.id);
    if (cartItems.length <= 0) {
      res.json({
        message: "No Items In Cart",
      });
    } else {
      const cartObj = await getCartObj(cart.id, cart.user_id);
      res.json({
        message: "a list of all Cart Items and total",
        data: cartObj,
      });
    }
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.body.productId);

  const cart: CartType = await CartModel.getCartByUserId(userId);
  const product: ProductType = await ProductModel.getProduct(productId);

  if (!product) {
    res.status(404).json({
      message: `Product with id: ${productId} cannot be found`,
    });
  }
  //the below code will make a new cart and cart item if the user
  //doesn't have one already and return the item in a list
  if (!cart) {
    const total = product.price * quantity;
    const newCart: CartType = await CartModel.createCart(userId, total);
    await CartItemModel.createCartItem(newCart.id, productId, quantity);
    const cartObj = await getCartObj(newCart.id, newCart.user_id);
    res.json({
      message: "a list of all Cart Items and total",
      data: cartObj,
    });
  } else {
    //cart exists
    //check if product alredy exists in cart and add it or quantity
    const foundItem: CartItemType = await CartItemModel.getProductInCart(
      cart.id,
      productId
    );
    if (foundItem) {
      const qty = foundItem.quantity + quantity;
      await CartItemModel.updateCartItem(qty, foundItem.id);
    } else {
      await CartItemModel.createCartItem(cart.id, productId, quantity);
    }
    const cartObj = await getCartObj(cart.id, cart.user_id);
    await CartModel.updateCartTotal(cartObj.bill, cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: cartObj,
    });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { productId, quantity } = req.body;

  const cart: CartType = await CartModel.getCartByUserId(userId);
  const product: ProductType = await ProductModel.getProduct(productId);

  if (!product) {
    res.status(404).json({
      message: `Product with id: ${productId} cannot be found`,
    });
  }

  if (!cart) {
    res.status(404).json({
      message: `Cart not found`,
    });
  } else {
    const foundItem: CartItemType = await CartItemModel.getProductInCart(
      cart.id,
      productId
    );
    if (foundItem) {
      await CartItemModel.updateCartItem(quantity, foundItem.id);
    } else {
      res.status(404).json({
        message: "Item not found in Cart",
      });
    }
    const cartObj = await getCartObj(cart.id, cart.user_id);
    await CartModel.updateCartTotal(cartObj.bill, cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: cartObj,
    });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.itemId);

  const cart: CartType = await CartModel.getCartByUserId(userId);
  console.log(userId);
  if (!cart) {
    res.status(404).json({
      message: `Cart not found`,
    });
  } else {
    const cartItem = await CartItemModel.getProductInCart(cart.id, productId);
    if (!cartItem) {
      res.status(404).json({
        message: `Item not found`,
      });
    } else {
      await CartItemModel.deleteCartItem(cartItem.id);
    }
    const cartObj = await getCartObj(cart.id, cart.user_id);
    await CartModel.updateCartTotal(cartObj.bill, cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: cartObj,
    });
  }
};
