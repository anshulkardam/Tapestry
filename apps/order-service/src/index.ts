import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", async (request, reply) => {
  reply.status(200).send({
    service: "order api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8002 });
    console.log("Order service is running on 8002");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
