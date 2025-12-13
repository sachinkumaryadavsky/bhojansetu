import { FastifyReply, FastifyRequest } from "fastify";
import { FoodService } from "../service/foodService";
import { reservationType } from "../schema/reservationSchema";

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
  },
  async reserveFood(req:FastifyRequest , reply : FastifyReply){
    try{
      const body = req.body as reservationType
      const result =  await FoodService.reservation(body.food_id,body.ngo_id);
      reply.status(200).send({
        message : "Food reserved successfully",
        data : result
      })
    
    }catch(error:any){
      
      console.log(`inside catch block error : ${error}`);
          reply.status(500).send({message:error.message,data :null})
    }

  }
};
