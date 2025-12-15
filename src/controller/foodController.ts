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

  },
  async approveDenyReservation(req:FastifyRequest, reply: FastifyReply){
    try{
    const { id } = req.params as { id:string };
    const userID = req.user.id;
   
    const reservationId = Number(id);
     if (Number.isNaN(reservationId)) {
        return reply.code(400).send({ message: "Invalid reservation id",status:false });
     }
     type ReservationAction = "approved" | "denied";
    const { status } = req.body as { status: ReservationAction };
    if (!["approved", "denied"].includes(status)) {
      return reply.code(400).send({ message: "Invalid status" });
    }
    const result = await FoodService.approveDenyReservation(reservationId,userID,status);
    reply.status(200).send({
      message:`Reservation ${status} successfully`,
      status: result.status

    })
    }catch(error:any){
      reply.status(500).send({message:error.message,status:false});

    }
  },
  async pickReserveFood(req:FastifyRequest,reply:FastifyReply){
    try{
      const { id } = req.params as { id:string };
      const userID = req.user.id;
   
    const reservationId = Number(id);
     if (Number.isNaN(reservationId)) {
        return reply.code(400).send({ message: "Invalid reservation id",status:false });
     }
     const result =  await FoodService.pickReserveFood(reservationId,userID);
     reply.status(200).send({
       message:"Food picked successfully",
       status:  result.status
     })

    }catch(error:any){
      reply.status(500).send({message:error.message,status:false});
    }
  },
  async reservationStatus(req:FastifyRequest,reply:FastifyReply){
    try{
       const { id } = req.params as { id:string };
       const userID = req.user.id;
   
    const reservationId = Number(id);
     if (Number.isNaN(reservationId)) {
        return reply.code(400).send({ message: "Invalid reservation id",status:false });
     }
     const result =  await FoodService.reservationStatus(reservationId,userID);
     reply.status(200).send({
      message:"Reservation status fetched successfully",
      status : result
     })

    }catch(error:any){
     reply.status(500).send({message:error.message,status:null});
    }
  }
  
};
