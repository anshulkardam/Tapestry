import type { IOrder } from "@repo/order-db";

export type OrderType = IOrder & {
  _id: string;
};

export type OrderChartType = {
  month: string;
  total: number;
  successful: number;
};
