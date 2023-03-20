import db from "../config/db";

export interface OrderItemType {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

class OrderItemModel {
  static async createOrderItem(
    orderId: number,
    productId: number,
    quantity: number
  ) {
    const results = await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity) VALUES ('${orderId}','${productId}', '${quantity}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllItemsFromOrder(orderId: number) {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      `SELECT id, order_id, product_id, quantity FROM order_items WHERE order_id='${orderId}';`
    );

    return results.rows;
  }

  static async getProductInOrder(orderId: number, product_id: number) {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      `SELECT id, order_id, product_id, quantity, notes FROM order_items WHERE order_id='${orderId}' AND product_id='${product_id}';`
    );

    return results.rows[0];
  }

  static async getOrderItem(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total, order_id, notes FROM order_items WHERE id = '${id}`
    );
    return results.rows[0];
  }

  static async deleteOrderItem(id: number) {
    await db.query(`DELETE FROM order_items WHERE id = '${id}'`);
  }

  static async updateOrderItem(quantity: number, notes: string, id: number) {
    const results = await db.query(
      `UPDATE order_items SET quantity= '${quantity}',
      notes='${notes}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default OrderItemModel;
