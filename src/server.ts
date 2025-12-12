
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import fastify from "fastify";
import FoodRoutes from "./routes";



const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5000;
app.register(FoodRoutes, { prefix: "/api" });

(async () => {
  await connectDB(app);
})();

app.get("/health", () => ({ message: "BhojanSetu API Running" }));

app.listen({port:PORT}, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
