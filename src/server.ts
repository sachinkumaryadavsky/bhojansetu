import dotenv from "dotenv";
dotenv.config();
import fastify from "fastify";
import { connectDB } from "./config/db";
import FoodRoutes from "./routes";
import jwtPlugin from "./plugins/jwt"; 

const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    // Register plugins FIRST
    await app.register(jwtPlugin);

    // Register routes
    await app.register(FoodRoutes, { prefix: "/api" });

    // DB connection
    await connectDB(app);

    // Health check
    app.get("/health", async () => ({
      message: "BhojanSetu API Running",
    }));

    await app.listen({ port: PORT });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
