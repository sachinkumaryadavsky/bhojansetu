import { FastifyRequest, FastifyReply } from "fastify";
import { AuthUser } from "./auth";

export const allowRoles =
  (roles: AuthUser["role"][]) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as AuthUser;

    if (!roles.includes(user.role)) {
      return reply.code(403).send({
        message: "You are not allowed to perform this action"
      });
    }
  };
