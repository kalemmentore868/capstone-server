import db from "../config/db";

export interface CartType {
  id: number;
  user_id: number;
  total: number;
}

class CartModel {
  static async createCart(userId: number, total: number) {
    const results = await db.query(
      `INSERT INTO cart (user_id, total) VALUES('${userId}','${total}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllCarts() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query("SELECT id, user_id, total FROM cart;");

    return results.rows;
  }

  static async getCart(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total FROM cart WHERE id = '${id}'`
    );
    return results.rows[0];
  }

  static async getCartByUserId(user_id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, user_id, total FROM cart WHERE user_id = '${user_id}'`
    );
    return results.rows[0];
  }

  static async deleteCart(id: number) {
    await db.query(`DELETE FROM cart WHERE id = '${id}'`);
  }

  static async updateCartTotal(total: number, id: number) {
    const results = await db.query(
      `UPDATE cart SET total= '${total}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default CartModel;
