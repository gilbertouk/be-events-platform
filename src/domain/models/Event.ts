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
  location: string;
  importedDate: Date | null;
  importedId: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
