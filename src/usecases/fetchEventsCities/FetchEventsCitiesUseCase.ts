import { EventService } from "../../domain/services/EventService";
import { type FetchEventsCitiesOutput } from "./FetchEventsCitiesOutput";

const eventService = new EventService();

export class FetchEventsCitiesUseCase {
  async fetchEventsCities(): Promise<FetchEventsCitiesOutput> {
    const eventsCities = await eventService.fetchEventsCities();
    return { eventsCities };
  }
}
