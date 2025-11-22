import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = getAuth(request);

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    return reply.code(401).send({ message: "You are not logged in" });
  }

  request.userId = userId;
};

const shouldBeAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId, sessionClaims } = getAuth(request);

  const claims = sessionClaims as CustomJwtSessionClaims;

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    return reply.code(401).send({ message: "You are not logged in" });
  }

  if (claims.metadata?.role !== "admin") {
    return reply.code(403).send({ message: "Unauthorized" });
  }

  request.userId = userId;
};

export { shouldBeUser, shouldBeAdmin };
