import { OrderService } from "../../domain/services/OrderService";
import { type SelectOrdersByUserIdInput } from "./SelectOrdersByUserIdInput";
import { type SelectOrdersByUserIdOutput } from "./SelectOrdersByUserIdOutput";

const orderService = new OrderService();

export class SelectOrdersByUserIdUseCase {
  async selectOrdersByUserId(
    input: SelectOrdersByUserIdInput,
  ): Promise<SelectOrdersByUserIdOutput[]> {
    const user: SelectOrdersByUserIdInput = {
      userId: input.userId,
    };
    const ordersSelected = await orderService.selectOrdersByUserId(user);

    return ordersSelected;
  }
}
