export interface IOrder {
  id: string;
  userId: string;
  eventId: string;
  tickets: number;
  createdAt: Date;
  updatedAt: Date;
  sessionStripeId?: string;
  statusStripeId?: string;
  paymentStripeId?: string;
}
