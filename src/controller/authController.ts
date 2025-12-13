import { authService } from "../service/authService"
import { FastifyReply, FastifyRequest } from "fastify";

export const authController = {
  async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const id = await authService.register(req.body);
      reply.status(201).send({ message: "Registered Successfully", status:true});
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  },

  async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = req.body as any;
      const user = await authService.login(email, password);
        const token = await reply.jwtSign({
         id: user.id,
         role: user.role,
       });
      reply.send({messag:"login successful", token:token});
    } catch (e: any) {
      reply.status(401).send({ message: e.message });
    }
  }
};
