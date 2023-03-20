import { Request, Response } from "express";
import CartModel, { CartType } from "../models/CartModel";
import ProductModel, { ProductType } from "../models/ProductModel";
import CartItemModel, { CartItemType } from "../models/CArtItemModel";
import { getCartTotal } from "../helpers/cartHelpers";

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
      res.json({
        message: "a list of all Cart Items and total",
        data: {
          cartItems,
          total: cart.total,
        },
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
    const cartItem: CartItemType = await CartItemModel.createCartItem(
      newCart.id,
      productId,
      quantity
    );
    res.json({
      message: "a list of all Cart Items and total",
      data: {
        cartItems: [cartItem],
        total,
      },
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
    const newTotal = await getCartTotal(cart.id);
    await CartModel.updateCartTotal(newTotal, cart.id);
    const cartItems = await CartItemModel.getAllCartItemsInCart(cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: {
        cartItems,
        total: newTotal,
      },
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
    const newTotal = await getCartTotal(cart.id);
    await CartModel.updateCartTotal(newTotal, cart.id);
    const cartItems = await CartItemModel.getAllCartItemsInCart(cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: {
        cartItems,
        total: newTotal,
      },
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
    const newTotal = await getCartTotal(cart.id);
    await CartModel.updateCartTotal(newTotal, cart.id);
    const cartItems = await CartItemModel.getAllCartItemsInCart(cart.id);

    res.json({
      message: "a list of all Cart Items and total",
      data: {
        cartItems,
        total: newTotal,
      },
    });
  }
};
