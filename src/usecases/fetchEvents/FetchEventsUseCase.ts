import { EventService } from "../../domain/services/EventService";
import { type FetchEventsOutput } from "../fetchEvents/FetchEventsOutput";
import { type FetchEventsInput } from "./FetchEventsInput";

const eventService = new EventService();

export class FetchEventsUseCase {
  async fetchAll(input: FetchEventsInput): Promise<FetchEventsOutput> {
    const events = await eventService.fetchAll({
      page: input.page,
      limit: input.limit | 9,
    });
    return { events };
  }
}
