import { OrderService } from "../../domain/services/OrderService";
import { type UpdateOrderStatusInput } from "./UpdateOrderStatusInput";

const orderService = new OrderService();

export class UpdateOrderUseCase {
  async updateStatus(input: UpdateOrderStatusInput): Promise<void> {
    const order: UpdateOrderStatusInput = {
      sessionStripeId: input.sessionStripeId,
      statusStripeId: input.statusStripeId,
      paymentStripeId: input.paymentStripeId,
    };

    await orderService.updateStatus(order);
  }
}
