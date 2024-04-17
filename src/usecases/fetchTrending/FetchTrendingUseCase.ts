import { EventService } from "../../domain/services/EventService";
import { type FetchEventsOutput } from "./FetchTrendingOutput";

const eventService = new EventService();

export class FetchTrendingUseCase {
  async fetchTrending(): Promise<FetchEventsOutput> {
    const events = await eventService.fetchTrending();
    return { events };
  }
}
