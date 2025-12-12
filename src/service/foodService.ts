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
  }
};
