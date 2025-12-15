import { FastifyRequest, FastifyReply } from "fastify";

export interface AuthUser {
  id: number;
  role: "restaurant" | "ngo";
}
declare module "fastify" {
  interface FastifyRequest {
    user: AuthUser;
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const decoded = await request.jwtVerify<AuthUser>();
    request.user = decoded;
  } catch {
    reply.code(401).send({ message: "Unauthorized" });
  }
}
