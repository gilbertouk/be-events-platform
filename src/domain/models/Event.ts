import { type ICategory } from "./Category";

export interface IEvent {
  id: string;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  price: string;
  description: string;
  information: string | null;
  userId: string;
  capacity: number;
  categoryId: string;
  logoUrl: string;
  city: string;
  address: string;
  postcode: string;
  country: string;
  priceStripeId: string | null;
  prodStripeId: string | null;
  importedDate: Date | null;
  importedId: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  category?: ICategory;
}
