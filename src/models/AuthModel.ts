import db from "../config/db";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "../helpers/expressError";

class AuthModel {
  static async authenticate(email: string, password: string) {
    const results = await db.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        password,
        is_admin 
      FROM users 
      WHERE email = $1`,
      [email]
    );
    const user = results.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return user;
      }
    }

    //if you get to this line of code it  means,  your email and/or password is incorrect
    throw new UnauthorizedError("Invalid Email/password");
  }
}

export default AuthModel;
