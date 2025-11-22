import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeUser } from "./middleware/auth";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.use(express.json());

app.use(clerkMiddleware());

app.use(helmet());

app.use(compression());

app.use("/products", productRoutes);

app.use("/category", categoryRoutes);

app.get("/", async (req, res) => {
  res.status(200).send({
    service: "product api",
    status: "ok",
    uptime: process.uptime().toLocaleString(),
  });
});

app.get("/test", shouldBeUser, (req, res) => {
  return res.status(200).send({
    message: "Authenticated!",
    userId: req.userId,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000, () => {
  console.log("product service running 8000");
});
