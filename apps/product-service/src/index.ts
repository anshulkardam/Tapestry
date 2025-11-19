import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.get("/", async (req, response) => {
  response
    .status(200)
    .send({
      service: "product api",
      status: "ok",
      uptime: process.uptime().toLocaleString(),
    });
});

app.listen(8000, () => {
  console.log("product service running 8000");
});
