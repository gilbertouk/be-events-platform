export interface IEvent {
  id: string;
  name: string;
  dataStart: Date;
  dateEnd: Date;
  price: string;
  description: string;
  information?: string;
  userId: string;
  capacity: number;
  categoryId: string;
  logoUrl: string;
  importedDate?: Date;
  importedId?: string;
  createdAt: Date;
  updatedAt: Date;
}
