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
<div class="product">
      <img src='${product.img_url}' alt="Product Image">
      <div class="product-info">
        <h4 class="product-title">${product.title}</h4>
        <p class="product-desc">${product.description}</p>
        <p class="product-price">Price: $${product.price}</p>
        <p class="product-quantity">Quantity: ${item.quantity}</p>
      </div>
    </div>
        `;
  }

  return email;
};
