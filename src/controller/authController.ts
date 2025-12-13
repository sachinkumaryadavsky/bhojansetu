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
      const token = await authService.login(email, password);
      reply.send(token);
    } catch (e: any) {
      reply.status(401).send({ message: e.message });
    }
  }
};
