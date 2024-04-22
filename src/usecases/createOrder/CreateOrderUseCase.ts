import { OrderService } from "../../domain/services/OrderService";
import { type CreateOrderInput } from "./CreateOrderInput";
import { type CreateOrderOutput } from "./CreateOrderOutput";

const orderService = new OrderService();

export class CreateOrderUseCase {
  async create(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const order: CreateOrderInput = {
      userId: input.userId,
      eventId: input.eventId,
      tickets: +input.tickets,
      sessionStripeId: input.sessionStripeId,
      statusStripeId: input.statusStripeId,
      paymentStripeId: input.paymentStripeId,
    };

    const createdOrder = await orderService.create(order);
    return { order: createdOrder };
  }
}
