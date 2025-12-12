import { db } from "../config/db";

export const FoodRepository = {
  async create(data: any) {
    const query = `
      INSERT INTO food 
      (restaurant_id, title, description, quantity, food_type, expiry_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.restaurant_id,
      data.title,
      data.description || "",
      data.quantity,
      data.food_type,
      data.expiry_time
    ];

    const [result]: any = await db().query(query, values);
    return result.insertId;
  },

  async findAllActive() {
    const [rows] = await db().query(
      `SELECT * FROM food WHERE status = 'active' ORDER BY created_at DESC`
    );
    return rows;
  }
};
