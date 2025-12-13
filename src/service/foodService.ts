import { error } from "node:console";
import { FoodRepository } from "../persistance/foodRepository";

export const FoodService = {
  async createFood(data: any) {
    // business validation
    if (!data.restaurant_id || !data.title || !data.quantity || !data.food_type || !data.expiry_time) {
      throw new Error("Missing required fields");
    }

    const id = await FoodRepository.create(data);
    return { id, ...data };
  },

  async getAllFoods() {
    const foods = await FoodRepository.findAllActive();
    return foods;
  },
  async reservation(foodId :number, ngoId : number){
    if(foodId < 0 || ngoId < 0) throw new  Error("Invalid food or ngoID ");
    const food= await FoodRepository.getFoodById(foodId);
    
    if(!food ||  food.status != "active") throw new Error ("food is not found or not-active");
    const user = await FoodRepository.getUserById(ngoId);
    if(!user || user.role != "ngo") throw new Error ("Not valid user")
    console.log("### Reservering food")
    const reserveFood = await FoodRepository.reserveFood(foodId);
    if(!reserveFood) throw new Error ("Error while claiming food");
    const result =  await FoodRepository.createReserveFood(foodId,ngoId);
    if(!result) throw new Error("errow while creating reservation");
    console.log(result);
    return { reservatioId : result};
  }

};
