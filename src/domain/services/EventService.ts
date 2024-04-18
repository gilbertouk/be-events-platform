import { type CreateEventInput } from "../../usecases/createEvent/CreateEventInput";
import { type DeleteEventInput } from "../../usecases/deleteEvent/DeleteEventInput";
import { type FetchEventsInput } from "../../usecases/fetchEvents/FetchEventsInput";
import { type SelectByIdEventInput } from "../../usecases/selectEventById/SelectByIdEventInput";
import { type FetchEventsOutput } from "../../usecases/fetchEvents/FetchEventsOutput";
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
          city: event.city,
          address: event.address,
          postcode: event.postcode,
          country: event.country,
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

  async delete(input: DeleteEventInput): Promise<IEvent | string> {
    try {
      const eventToDelete = await database.event.findUnique({
        where: { id: input.id },
      });

      if (!eventToDelete) {
        return "Event not found";
      }

      const orderModel = await database.order.findMany({
        where: { eventId: input.id },
      });

      if (orderModel.length > 0) {
        return "Event cannot be deleted because a ticket has already been sold";
      }

      const eventModel = await database.event.delete({
        where: { id: input.id },
      });

      return eventModel;
    } catch (error) {
      throw new Error();
    }
  }

  async fetchAll(input: FetchEventsInput): Promise<FetchEventsOutput> {
    try {
      const events = await database.event.findMany({
        where: {
          dateStart: {
            gte: new Date(),
          },
        },
        orderBy: {
          dateStart: "asc",
        },
        take: input.limit,
        skip: (input.page - 1) * input.limit,
      });

      const _count = await database.event.count({
        where: {
          dateStart: {
            gte: new Date(),
          },
        },
      });

      return { events, _count };
    } catch (error) {
      throw new Error();
    }
  }

  async selectByIdEvent(input: SelectByIdEventInput): Promise<IEvent | null> {
    try {
      const event = await database.event.findUnique({
        where: { id: input.id, dateStart: { gte: new Date() } },
      });

      if (event) {
        await database.event.update({
          where: { id: input.id },
          data: {
            viewCount: event.viewCount + 1,
          },
        });
      }

      return event;
    } catch (error) {
      throw new Error();
    }
  }

  async fetchTrending(): Promise<IEvent[]> {
    try {
      const events = await database.event.findMany({
        where: {
          dateStart: {
            gte: new Date(),
          },
        },
        orderBy: [{ viewCount: "desc" }, { dateStart: "asc" }],
        take: 6,
      });

      return events;
    } catch (error) {
      throw new Error();
    }
  }
}
