import { type CreateOrderInput } from "../../usecases/createOrder/CreateOrderInput";
import { type UpdateOrderStatusInput } from "../../usecases/updateOrderStatus/UpdateOrderStatusInput";
import { type IOrder } from "../models/Order";
import { database } from "../../infrastructure/database/";
import { type SelectOrdersByUserIdInput } from "../../usecases/selectOrdersByUserId/SelectOrdersByUserIdInput";
import { type SelectOrdersByUserIdOutput } from "src/usecases/selectOrdersByUserId/SelectOrdersByUserIdOutput";

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

  async updateStatus(order: UpdateOrderStatusInput): Promise<void> {
    try {
      await database.order.updateMany({
        where: {
          sessionStripeId: order.sessionStripeId,
        },
        data: {
          statusStripeId: order.statusStripeId,
          paymentStripeId: order.paymentStripeId,
        },
      });
    } catch (error) {
      throw new Error();
    }
  }

  async selectOrdersByUserId(
    user: SelectOrdersByUserIdInput,
  ): Promise<SelectOrdersByUserIdOutput[]> {
    try {
      const orders = await database.order.findMany({
        where: {
          userId: user.userId,
          statusStripeId: "complete",
          event: {
            dateStart: {
              gte: new Date(),
            },
          },
        },
        include: {
          event: true,
        },
      });

      return orders;
    } catch (error) {
      throw new Error();
    }
  }
}
