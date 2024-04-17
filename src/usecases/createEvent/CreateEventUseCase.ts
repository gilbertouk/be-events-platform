import { EventService } from "../../domain/services/EventService";
import { type CreateEventInput } from "./CreateEventInput";
import { type CreateEventOutput } from "./CreateEventOutput";

const eventService = new EventService();

export class CreateEventUseCase {
  async create(input: CreateEventInput): Promise<CreateEventOutput | null> {
    const event: CreateEventInput = {
      name: input.name,
      dateStart: input.dateStart,
      dateEnd: input.dateEnd,
      location: input.location,
      categoryId: input.categoryId,
      price: input.price,
      description: input.description,
      userId: input.userId,
      capacity: input.capacity,
      logoUrl: input.logoUrl,
      information: input.information,
    };

    const createdEvent = await eventService.create(event);

    if (!createdEvent) {
      return null;
    }

    return { event: createdEvent };
  }
}
