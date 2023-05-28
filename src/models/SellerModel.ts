import db from "../config/db";
import bcrypt from "bcryptjs";

export interface SellerType {
  id: number;
  address: string;
  opening_hours: string;
  name: string;
  email: string;
  password: string;
  phone_no: string;
}

class SellerModel {
  static async createSeller(seller: SellerType) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(seller.password, salt);
    const results = await db.query(
      `INSERT INTO sellers (address, opening_hours, name, email, password, phone_no) VALUES('${seller.address}','${seller.opening_hours}','${seller.name}', '${seller.email}','${hashPassword}', '${seller.phone_no}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllSellers() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, address, opening_hours, name, email,phone_no, password FROM sellers;"
    );

    return results.rows;
  }

  static async getSeller(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,address, opening_hours, name, email, phone_no, password FROM sellers WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async getSellerByEmail(email: string) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, address, opening_hours, name, email, phone_no, password FROM sellers WHERE email = '${email}'`
    );
    return results.rows[0];
  }

  static async deleteSeller(id: number) {
    await db.query(`DELETE FROM sellers WHERE id = '${id}'`);
  }

  static async updateSeller(seller_form_data: SellerType, id: number) {
    const results = await db.query(
      `UPDATE sellers SET address ='${seller_form_data.address}',
          email='${seller_form_data.email}',
          name='${seller_form_data.name}',
          opening_hours='${seller_form_data.opening_hours}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default SellerModel;
