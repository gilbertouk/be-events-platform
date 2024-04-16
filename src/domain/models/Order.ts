export interface IOrder {
  id: string;
  userId: string;
  eventId: string;
  tickets: number;
  createdAt: Date;
  updatedAt: Date;
}
