import { type IEvent } from "src/domain/models/Event";

export interface SelectOrdersByUserIdOutput {
  id: string;
  userId: string;
  eventId: string;
  tickets: number;
  createdAt: Date;
  updatedAt: Date;
  sessionStripeId: string | null;
  statusStripeId: string | null;
  paymentStripeId: string | null;
  event: IEvent;
}
