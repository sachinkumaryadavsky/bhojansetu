
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import fastify from "fastify";



const app = fastify({ logger: true });
const PORT = Number(process.env.PORT) || 5000;

(async () => {
  await connectDB(app);
})();

app.get("/health", () => ({ message: "BhojanSetu API Running" }));

app.listen({port:PORT}, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
