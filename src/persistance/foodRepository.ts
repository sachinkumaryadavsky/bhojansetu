import { db } from "../config/db";
import { RowDataPacket } from "mysql2";
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
  },
  

  async createReserveFood( foodId :number , ngoId :number){
      const query = `INSERT into reservations(food_id,ngo_id) values(?,?)`;
      const [result] =  await db().query(query,[foodId,ngoId]);
      const { insertId } = result as { insertId: number };
      return insertId;
  },
  async getFoodById(food_id:number){
    const query  = `SELECT * FROM food WHERE id = ?`;
    const [rows] = await db().execute<RowDataPacket[]>(query,[food_id]);
    const result = rows[0] ?? null;
    return result;
  },
  async getUserById(userId : number){
    const query =   `SELECT * FROM users WHERE id = ?`;
    const [rows] = await db().execute<RowDataPacket[]>(query,[userId]);
    const result = rows[0] ?? null;
    return result;
  },
  async reserveFood(food_id: number){
    const query = `UPDATE food SET STATUS = 'claimed' where id = ?`;
    const  [result] = await db().execute(query,[food_id]);
      const { affectedRows } = result as { affectedRows: number };
      return affectedRows;
  },
  async approveDenyReservation(reservatioId:number,flag:string){
     const query = `UPDATE reservations SET status = ?,updated_at = CURRENT_TIMESTAMP where id = ?`;
    const  result = await db().execute(query,[flag,reservatioId]);
    return result;
  },
  async getReservationById(reservatioId:number){

    const query =   `SELECT * FROM reservations WHERE id = ?`;
    const [rows] = await db().execute<RowDataPacket[]>(query,[reservatioId]);
    const result = rows[0] ?? null;
    return result;
  },
  async pickReserveFood(reservatioId:number){
    const query = `UPDATE reservations SET status = "picked_up", picked_up_at = CURRENT_TIMESTAMP where id = ?`;
    const  result = await db().execute(query,[reservatioId]);
    return result;
  },
  async getReservationByFoodId(foodId:number){
  const query = `SELECT * FROM reservations WHERE food_id = ? AND status ='requested'`;
  const  [result] = await db().execute(query,[foodId]);
  return result;

  }




};
