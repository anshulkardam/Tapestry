import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/auth";
import userRoutes from "./routes/user";
import { producer } from "./utils/kafka";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

app.use(clerkMiddleware());

app.use("/users", shouldBeAdmin, userRoutes);

app.get("/", async (req, res) => {
  res.status(200).send({
    service: "auth api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const start = async () => {
  try {
    await producer.connect();

    app.listen(8003, () => {
      console.log(`Auth Service running on PORT:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
