import db from "../config/db";

export interface AddressType {
  id: number;
  user_id: number;
  house_number: string;
  street: string;
  city: string;
  created_at: Date;
}

class AddressModel {
  static async createAddress(address: AddressType, user_id: number) {
    const results = await db.query(
      `INSERT INTO addresses (user_id, house_number, street, city) VALUES ('${user_id}', '${address.house_number}', '${address.street}', '${address.city}') RETURNING *`
    );
    return results.rows[0];
  }

  static async getAllAddresses() {
    const results = await db.query("SELECT * FROM addresses");
    return results.rows;
  }

  static async getAddressByUser(user_id: number) {
    const results = await db.query(
      `SELECT * FROM addresses WHERE user_id = ${user_id}`
    );
    return results.rows;
  }

  static async getAddress(id: number) {
    const results = await db.query(`SELECT * FROM addresses WHERE id = ${id}`);
    return results.rows[0];
  }

  static async updateAddress(
    address: AddressType,
    id: number,
    user_id: number
  ) {
    const results = await db.query(
      `UPDATE addresses SET user_id = '${user_id}', house_number = '${address.house_number}', street = '${address.street}', city = '${address.city}' WHERE id = ${id} RETURNING *`
    );
    return results.rows[0];
  }

  static async deleteAddress(id: number, user_id: number) {
    await db.query(
      `DELETE FROM addresses WHERE id = ${id} AND user_id = ${user_id}`
    );
  }
}

export default AddressModel;
