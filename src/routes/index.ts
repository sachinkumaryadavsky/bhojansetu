import { FastifyInstance } from "fastify";
import { FoodController } from "../controller/foodController";
import { authController } from "../controller/authController";


export default async function FoodRoutes(app: FastifyInstance) {
   app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.post("/food", FoodController.create);
  app.get("/food", FoodController.getAll);
  app.post("/reservation",FoodController.reserveFood);
}
