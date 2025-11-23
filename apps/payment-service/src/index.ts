import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import sessionRoute from "./routes/session";
import { cors } from "hono/cors";
import webhookRouter from "./routes/webhook";
const app = new Hono();

app.use("*", clerkMiddleware());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (c) => {
  c.status(200);
  return c.json({
    service: "payment api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});

app.route("/session", sessionRoute);
app.route("/webhooks", webhookRouter);

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
