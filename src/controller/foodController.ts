import { FastifyReply, FastifyRequest } from "fastify";
import { FoodService } from "../service/foodService";

export const FoodController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await FoodService.createFood(req.body);
      
      reply.status(201).send({
        message: "Food posted successfully",
        data: result
      });

    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  },

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const foods = await FoodService.getAllFoods();
    reply.send(foods);
  }
};
