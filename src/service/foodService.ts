import { error } from "node:console";
import { FoodRepository } from "../persistance/foodRepository";
import { errorCodes } from "fastify";
import { reservationSchema } from "../schema/reservationSchema";

export const FoodService = {
  async createFood(data: any,restaurantID:number) {
    // business validation
    if ( !data.title || !data.quantity || !data.food_type || !data.expiry_time) {
      throw new Error("Missing required fields");
    }

    const id = await FoodRepository.create(data,restaurantID);
    return { id, ...data };
  },

  async getAllFoods() {
    const foods = await FoodRepository.findAllActive();
    return foods;
  },
  async reservation(foodId :number, ngoId : number){
    if(foodId < 0 || ngoId < 0) throw new  Error("Invalid food or ngoID ");
    const food= await FoodRepository.getFoodById(foodId);
    
    if(!food ) throw new Error ("food is not found or not-active");
    const user = await FoodRepository.getUserById(ngoId);
    if(!user || user.role != "ngo") throw new Error ("Not valid user")
    console.log("### Reservering food")
    const reserveFood = await FoodRepository.reserveFood(foodId);
    if(!reserveFood) throw new Error ("Error while claiming food");
    const result =  await FoodRepository.createReserveFood(foodId,ngoId);
    if(!result) throw new Error("errow while creating reservation");
    console.log(result);
    return { reservatioId : result};
  },
  async approveDenyReservation(reservationId:number,restaurantID : number,flag:string){
    
    const reservationData = await FoodRepository.getReservationById(reservationId);
   
    if(!reservationData ||   reservationData.status!="requested" ) throw new Error("Reservation not found or already approved or denied or picked up");
    const foodData  = await FoodRepository.getFoodById(reservationData.food_id);
    if(!foodData) throw new Error ("Food not found");
    if(foodData.restaurant_id != restaurantID ) throw new Error (`You can not  approve or reject`);    
    const result = await FoodRepository.approveDenyReservation(reservationId,flag);
     if(!result) throw new Error(`Errow: food not ${flag}`);
     return {
       status:true
     }
  },
  async pickReserveFood(reservationId:number,ngoId:number){
    const reservationData = await FoodRepository.getReservationById(reservationId);
    if(!reservationData || reservationData.status != "approved") throw new Error ("Food reservation not found or already picked");
    if(reservationData.ngo_id != ngoId) throw new Error (`You are not allowed to pick food `); 
    const foodData  = await FoodRepository.getFoodById(reservationData.food_id);
    if(!foodData) throw new Error ("Food not found");
    const result = await FoodRepository.pickReserveFood(reservationId);
    if(!result) throw new Error("Errow while picking up food");
     return {
       status:true
     }
  },
  async reservationStatus(reservationId:number,userID:number){
     const reservationData = await FoodRepository.getReservationById(reservationId);
     if(!reservationData ) throw new Error("Reservation not found");
     const result = await FoodRepository.getReservationById(reservationId);
     if(!result) throw new Error("Error while checking reservation status");
     return result.status;
  },
  async reservationList(foodId : number,restaurantID:number){
    const foodData  = await FoodRepository.getFoodById(foodId);
    if(!foodData) throw new Error ("Food not found");
    if(foodData.restaurant_id != restaurantID) throw new Error (`You are not allowed to check the request list`); 
    const result =  await FoodRepository.getReservationByFoodId(foodId);
    return result;
    
  },
  async foodPostedByRestaurant(restaurantID :number){
    const result = await FoodRepository.getFoodByRestaurantId(restaurantID);
    return  result;
  },
  async reservationListByNGOId(ngoId : number){
    const result = await FoodRepository.getReservationByUserId(ngoId);
    return result ;
  }

};
