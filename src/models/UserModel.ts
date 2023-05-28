import db from "../config/db";
import bcrypt from "bcryptjs";

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
  phone_number: string;
  created_on: Date;
  last_login: Date;
}

class UserModel {
  static async createUser(user: UserType) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    const results = await db.query(
      `INSERT INTO users (first_name,last_name,email,password, is_admin, phone_number) VALUES('${user.first_name}','${user.last_name}','${user.email}', '${hashPassword}','${user.is_admin}', '${user.phone_number}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllUsers() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, first_name,last_name,email,password,is_admin, created_on, last_login, phone_number FROM users;"
    );

    return results.rows;
  }

  static async getUser(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,first_name,last_name,email,password,is_admin, created_on, last_login, phone_number FROM users WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async getUserByEmail(email: string) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,first_name,last_name,email,password,is_admin, created_on, last_login, phone_number FROM users WHERE email = '${email}'`
    );
    return results.rows[0];
  }

  static async deleteUser(id: number) {
    await db.query(`DELETE FROM users WHERE id = '${id}'`);
  }

  static async updateUser(user_form_data: UserType, id: number) {
    const results = await db.query(
      `UPDATE users SET first_name ='${user_form_data.first_name}',
          last_name='${user_form_data.last_name}',
          phone_number='${user_form_data.phone_number}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}
export default UserModel;
