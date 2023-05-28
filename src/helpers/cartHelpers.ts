import CartItemModel, { CartItemType } from "../models/CartItemModel";
import ProductModel, { ProductType } from "../models/ProductModel";

export const getCartObj = async (cartId: number, userId: number) => {
  const cartItems: CartItemType[] = await CartItemModel.getAllCartItemsInCart(
    cartId
  );

  let total = 0;
  let items = [];

  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    const product: ProductType = await ProductModel.getProduct(item.product_id);
    const itemTotal = product.price * item.quantity;
    const cartObj = {
      productId: product.id,
      name: product.title,
      price: product.price,
      img_url: product.img_url,
      quantity: cartItems[i].quantity,
    };
    items.push(cartObj);
    total += itemTotal;
  }
  return {
    userId,
    items,
    bill: total,
  };
};
