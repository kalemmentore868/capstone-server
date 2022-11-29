import db from "../config/db";
import bcrypt from "bcrypt";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin?: boolean;
  id?: number;
}

interface User_Form {
  first_name: string;
  last_name: string;
}

class UserModel {
  static async createUser(user: User) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const results = await db.query(
      `
        INSERT INTO users 
        (
            first_name,
            last_name,
            email,
            password
        ) 
        VALUES($1,$2,$3,$4) 
        RETURNING id,first_name,last_name,email,is_admin`,
      [user.first_name, user.last_name, user.email, hashPassword]
    );
    return results.rows[0];
  }

  static async createAdminUser(user: User) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const results = await db.query(
      `
        INSERT INTO users 
        (
            first_name,
            last_name,
            email,
            password,
            is_admin
        ) 
        VALUES($1,$2,$3,$4,$5) 
        RETURNING id,first_name,last_name,email,is_admin`,
      [user.first_name, user.last_name, user.email, hashPassword, user.is_admin]
    );
    return results.rows[0];
  }

  static async getAllUsers() {
    const results = await db.query(`
        SELECT 
            id,
            first_name,
            last_name,
            email,
            is_admin 
        FROM users;`);

    return results.rows;
  }

  static async getUserByEmail(email: string) {
    const results = await db.query(
      `
        SELECT 
            id,
            first_name,
            last_name,
            email,
            is_admin
        FROM users 
        WHERE email=$1`,
      [email]
    );

    return results.rows[0];
  }

  static async getUserById(id: number) {
    const results = await db.query(
      `
        SELECT 
            id,
            first_name,
            last_name,
            email,
            is_admin
        FROM users 
        WHERE id = $1`,
      [id]
    );
    return results.rows[0];
  }

  static async deleteUser(id: number) {
    const results = await db.query(
      `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING *`,
      [id]
    );
    return results.rows[0];
  }

  static async updateUser(user_form: User_Form, id: number) {
    const results = await db.query(
      `
        UPDATE users 
        SET first_name =$1,
        last_name=$2
        WHERE id=$3
        RETURNING id,first_name,last_name,email,isadmin;`,
      [user_form.first_name, user_form.last_name, id]
    );
    return results.rows[0];
  }
}

export default UserModel;
