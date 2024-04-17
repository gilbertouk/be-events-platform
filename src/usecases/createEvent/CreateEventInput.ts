export interface CreateEventInput {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  categoryId: string;
  price: string;
  description: string;
  userId: string;
  capacity: number;
  logoUrl: string;
  information: string | null;
}
