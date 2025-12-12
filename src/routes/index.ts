import { FastifyInstance } from "fastify";
import { FoodController } from "../controller/foodController";

export default async function FoodRoutes(app: FastifyInstance) {
  app.post("/food", FoodController.create);
  app.get("/food", FoodController.getAll);
}
