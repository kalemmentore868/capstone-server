import db from "../config/db";

export interface CartItemType {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}

class CartItemModel {
  static async createCartItem(
    cartId: number,
    productId: number,
    quantity: number
  ) {
    const results = await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ('${cartId}','${productId}', '${quantity}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllCartItemsInCart(cartId: number) {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      `SELECT id, cart_id, product_id, quantity FROM cart_items WHERE cart_id='${cartId}';`
    );

    return results.rows;
  }

  static async getProductInCart(cartId: number, product_id: number) {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      `SELECT id, cart_id, product_id, quantity FROM cart_items WHERE cart_id='${cartId}' AND product_id='${product_id}';`
    );

    return results.rows[0];
  }

  static async getCartItem(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total FROM cart_items WHERE id = '${id}`
    );
    return results.rows[0];
  }

  static async deleteCartItem(id: number) {
    await db.query(`DELETE FROM cart_items WHERE id = '${id}'`);
  }

  static async updateCartItem(quantity: number, id: number) {
    const results = await db.query(
      `UPDATE cart_items SET quantity= '${quantity}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default CartItemModel;
