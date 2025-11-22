import { Schema, model } from "mongoose";

export type Product = {
  name: string;
  quantity: number;
  price: number;
};

export interface IOrder {
  userId: string;
  email: string;
  amount: number;
  status: "success" | "failed";
  products: Product[];
  shippingAddress: string;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["success", "failed"],
        message: "`{VALUE}` is not supported",
      },
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("order", orderSchema);


