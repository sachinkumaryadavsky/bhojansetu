import { FastifyInstance } from "fastify";
import { FoodController } from "../controller/foodController";
import { authController } from "../controller/authController";
import { authenticate } from "../plugins/auth"
import { allowRoles } from "../plugins/roleGuard";
export default async function Routes(app: FastifyInstance) {

   //  Public routes (no JWT)
  app.post("/register", authController.register);
  app.post("/login", authController.login);

  // Protected routes (JWT required)
  app.register(async function (protectedRoutes) {
    protectedRoutes.addHook("preHandler", authenticate);

    protectedRoutes.post("/food",{ preHandler: [allowRoles(["restaurant"])] }, FoodController.create);
    protectedRoutes.get("/food", FoodController.getAll);
    protectedRoutes.post("/reservation",{ preHandler: [allowRoles(["ngo"])] }, FoodController.reserveFood);
    protectedRoutes.patch("/reservation/:id/status",{preHandler:[allowRoles(["restaurant"])]},FoodController.approveDenyReservation);
    protectedRoutes.patch("/reservation/:id/pick",{preHandler:[allowRoles(["ngo"])]},FoodController.pickReserveFood);
    protectedRoutes.get("/reservation/:id/status",{preHandler:[allowRoles(["ngo","restaurant"])]},FoodController.reservationStatus);
    protectedRoutes.get("/reservation/food/:foodId",{preHandler:[allowRoles(["restaurant"])]},FoodController.getReservationList);
    protectedRoutes.get("/food/my",{preHandler:[allowRoles(["restaurant"])]},FoodController.getFoodByResturanId);
    protectedRoutes.get("/reservation/my",{preHandler:[allowRoles(["ngo"])]},FoodController.getReservationListByNGOId);
  });
}
