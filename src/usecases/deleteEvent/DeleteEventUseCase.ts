import { EventService } from "../../domain/services/EventService";
import { type DeleteEventInput } from "./DeleteEventInput";
import { type DeleteEventOutput } from "./DeleteEventOutput";

const eventService = new EventService();

export class DeleteEventUseCase {
  async delete(input: DeleteEventInput): Promise<DeleteEventOutput | string> {
    const event: DeleteEventInput = {
      id: input.id,
    };
    const eventDeleted = await eventService.delete(event);

    if (typeof eventDeleted === "string") {
      return eventDeleted;
    }

    return { event: eventDeleted };
  }
}
