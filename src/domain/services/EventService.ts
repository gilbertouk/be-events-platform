import { type CreateEventInput } from "../../usecases/createEvent/CreateEventInput";
import { type IEvent } from "../models/Event";
import { database } from "../../infrastructure/database/";

export class EventService {
  async create(event: CreateEventInput): Promise<IEvent | null> {
    try {
      const category = await database.category.findUnique({
        where: { id: event.categoryId },
      });

      if (!category) {
        return null;
      }

      const eventModel = await database.event.create({
        data: {
          name: event.name,
          dateStart: event.dateStart,
          dateEnd: event.dateEnd,
          location: event.location,
          categoryId: event.categoryId,
          price: event.price,
          description: event.description,
          userId: event.userId,
          capacity: event.capacity,
          logoUrl: event.logoUrl,
          information: event.information,
        },
      });
      return eventModel;
    } catch (error) {
      throw new Error();
    }
  }
}
