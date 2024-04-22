import { type IOrder } from "../models/Order";
import { type CreateOrderInput } from "../../usecases/createOrder/CreateOrderInput";
import { database } from "../../infrastructure/database/";

export class OrderService {
  async create(order: CreateOrderInput): Promise<IOrder> {
    try {
      const orderModel = await database.order.create({
        data: {
          userId: order.userId,
          eventId: order.eventId,
          tickets: order.tickets,
          sessionStripeId: order.sessionStripeId ?? null,
          statusStripeId: order.statusStripeId ?? null,
          paymentStripeId: order.paymentStripeId ?? null,
        },
      });

      return orderModel;
    } catch (error) {
      throw new Error();
    }
  }
}
