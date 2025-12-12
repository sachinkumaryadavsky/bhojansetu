import mysql from "mysql2/promise";
import { FastifyInstance } from "fastify";

let pool: mysql.Pool;

export async function connectDB(app: FastifyInstance) {
  try {
    

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      connectionLimit: 10
    });

    const conn = await pool.getConnection();
    conn.release();

    app.log.info(" MySQL Connected Successfully");
  } catch (error: any) {
    app.log.error("MySQL connection error:", error.message);
    console.error("FULL ERROR OBJECT:", error); 
  }
}

export const db = () => pool;
