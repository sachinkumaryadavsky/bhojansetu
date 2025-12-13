import {z} from "zod";
export const reservationSchema = z.object({
    food_id : z.number(),
    ngo_id :z.number()
});
export type reservationType = z.infer<typeof reservationSchema>;