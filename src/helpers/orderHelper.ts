import OrderItemModel, { OrderItemType } from "../models/OrderItemModel";
import ProductModel, { ProductType } from "../models/ProductModel";

export const getOrderObj = async (
  orderItems: OrderItemType[],
  created_at: Date | undefined,
  id: number
) => {
  let total = 0;
  let items = [];

  for (let i = 0; i < orderItems.length; i++) {
    let item = orderItems[i];
    const product: ProductType = await ProductModel.getProduct(item.product_id);
    const itemTotal = product.price * item.quantity;
    const orderObj = {
      productId: product.id,
      name: product.title,
      price: product.price,
      img_url: product.img_url,
      quantity: orderItems[i].quantity,
    };
    items.push(orderObj);
    total += itemTotal;
  }

  if (!created_at) created_at = new Date();
  return {
    items,
    total,
    created_at,
    id,
  };
};
