import { db } from "../config/db";

export const userRepository = {
  async findUserByEmail(email: string) {
    const [rows]: any = await db().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  async createUser(user: any) {
    const [result]: any = await db().query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [user.name, user.email, user.password, user.role]
    );
    return result.insertId;
  }
};
