import { FastifyRequest, FastifyReply } from "fastify";

export interface AuthUser {
  id: number;
  role: "restaurant" | "ngo";
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const decoded = await request.jwtVerify<AuthUser>();
    (request as any).user = decoded;
  } catch {
    reply.code(401).send({ message: "Unauthorized" });
  }
}
