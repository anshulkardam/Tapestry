import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  c.status(200);
  return c.json({
    service: "payment api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});
const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8001,
      },
      (info) => {
        console.log("Payment service running on 8001");
      }
    );
  } catch (error) {
    console.log("errpr", error);
    process.exit(1);
  }
};

start();
