import CartItemModel, { CartItemType } from "../models/CArtItemModel";
import ProductModel, { ProductType } from "../models/ProductModel";

export const getCartTotal = async (cartId: number) => {
  const cartItems: CartItemType[] = await CartItemModel.getAllCartItemsInCart(
    cartId
  );

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    const product: ProductType = await ProductModel.getProduct(item.product_id);
    const itemTotal = product.price * item.quantity;

    total += itemTotal;
  }
  return total;
};
