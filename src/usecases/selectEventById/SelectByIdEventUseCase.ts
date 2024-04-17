import { EventService } from "../../domain/services/EventService";
import { type SelectByIdEventInput } from "./SelectByIdEventInput";
import { type SelectByIdEventOutput } from "./SelectByIdEventOutput";

const eventService = new EventService();

export class SelectByIdEventUseCase {
  async selectById(
    input: SelectByIdEventInput,
  ): Promise<SelectByIdEventOutput | null> {
    const user: SelectByIdEventInput = {
      id: input.id,
    };
    const eventSelected = await eventService.selectByIdEvent(user);

    if (!eventSelected) {
      return null;
    }

    return { event: eventSelected };
  }
}
