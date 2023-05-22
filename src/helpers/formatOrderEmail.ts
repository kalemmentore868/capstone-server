import OrderItemModel, { OrderItemType } from "../models/OrderItemModel";
import ProductModel, { ProductType } from "../models/ProductModel";

export const getOrdersAsString = async (orderId: number) => {
  const orderedItems: OrderItemType[] =
    await OrderItemModel.getAllItemsFromOrder(orderId);
  let email = "";
  for (let i = 0; i < orderedItems.length; i++) {
    const item = orderedItems[i];
    // @ts-ignore
    const product: ProductType = await ProductModel.getProduct(item.product_id);
    email += `  
        Item Name: ${product.title}
        Price: $${product.price}
        Quantity: ${item.quantity}

        `;
  }

  return email;
};
