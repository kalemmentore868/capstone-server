import db from "../config/db";

export interface OrderType {
  id: number;
  user_id: number;
  total: number;
  notes: string;
  created_at?: Date;
}

class OrderModel {
  static async createOrder(order: OrderType) {
    const results = await db.query(
      `INSERT INTO orders (user_id, total, notes) VALUES('${order.user_id}','${order.total}','${order.notes}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllOrders() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, user_id, total, notes, created_at FROM orders;"
    );

    return results.rows;
  }

  static async getOrder(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total, notes, created_at FROM orders WHERE id = '${id}'`
    );
    return results.rows[0];
  }

  static async getOrderByUserId(user_id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total, notes, created_at FROM orders WHERE user_id = '${user_id}'`
    );
    return results.rows[0];
  }

  static async getAllUsersOrders(user_id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total, notes, created_at FROM orders WHERE user_id = '${user_id}'`
    );
    return results.rows;
  }

  static async deleteOrder(id: number) {
    await db.query(`DELETE FROM orders WHERE id = '${id}'`);
  }

  static async updateOrder(total: number, notes: string, id: number) {
    const results = await db.query(
      `UPDATE cart SET total= '${total}',
          notes = '${notes}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default OrderModel;
