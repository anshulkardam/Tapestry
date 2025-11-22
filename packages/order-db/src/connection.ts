import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";

const connectionOptions: ConnectOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
  dbName: "tapestry-order-db",
};

const connectToOrderDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI is missing");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    console.log("Order Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to order database", err);
  }
};

const disconnectOrderDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Order Database disconnected successfully");
  } catch (err) {
    console.error("Error during disconnecting from order database", err);
  }
};

export { connectToOrderDB, disconnectOrderDB };
