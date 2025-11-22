import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/auth";
import { connectToOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/", async (request, reply) => {
  reply.status(200).send({
    service: "order api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, async (request, reply) => {
  reply.status(200).send({
    message: "Authenticated",
    user: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectToOrderDB();

    await fastify.listen({ port: 8002 });
    console.log("Order service is running on 8002");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
