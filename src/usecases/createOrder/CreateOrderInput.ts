export interface CreateOrderInput {
  userId: string;
  eventId: string;
  tickets: number;
  sessionStripeId: string | null;
  statusStripeId: string | null;
  paymentStripeId: string | null;
}
