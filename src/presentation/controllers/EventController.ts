import type { HttpRequest, HttpResponse } from "../protocols";
import {
  MissingParamError,
  InvalidParamError,
  MissingQueryError,
  InvalidQueryError,
} from "../errors";
import { badRequest, notFound, serverError } from "../helpers/http-helpers";
import { CreateEventUseCase } from "../../usecases/createEvent/CreateEventUseCase";
import { DeleteEventUseCase } from "../../usecases/deleteEvent/DeleteEventUseCase";
import { FetchEventsUseCase } from "../../usecases/fetchEvents/FetchEventsUseCase";
import { SelectByIdEventUseCase } from "../../usecases/selectEventById/SelectByIdEventUseCase";
import { FetchTrendingUseCase } from "../../usecases/fetchTrending/FetchTrendingUseCase";
import { FetchEventsCitiesUseCase } from "../../usecases/fetchEventsCities/FetchEventsCitiesUseCase";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  dateStart: z.date(),
  dateEnd: z.date(),
  city: z.string(),
  address: z.string(),
  postcode: z.string(),
  country: z.string(),
  categoryId: z.string(),
  price: z.string(),
  description: z.string(),
  userId: z.string(),
  capacity: z.number(),
  logoUrl: z.string(),
});

interface passedMessageError {
  validation: string;
  code: string;
  message: string;
  path: [string];
}

const createEventUseCase = new CreateEventUseCase();
const deleteEventUseCase = new DeleteEventUseCase();
const fetchEventsUseCase = new FetchEventsUseCase();
const selectByIdEventUseCase = new SelectByIdEventUseCase();
const fetchTrendingUseCase = new FetchTrendingUseCase();
const fetchEventsCitiesUseCase = new FetchEventsCitiesUseCase();

export class EventController {
  static async crateEvent(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        "name",
        "dateStart",
        "dateEnd",
        "city",
        "address",
        "postcode",
        "country",
        "categoryId",
        "price",
        "description",
        "userId",
        "capacity",
        "logoUrl",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const eventBody = {
        name: httpRequest.body.name,
        dateStart: new Date(httpRequest.body.dateStart as string),
        dateEnd: new Date(httpRequest.body.dateEnd as string),
        city: httpRequest.body.city,
        address: httpRequest.body.address,
        postcode: httpRequest.body.postcode,
        country: httpRequest.body.country,
        categoryId: httpRequest.body.categoryId,
        price: httpRequest.body.price,
        description: httpRequest.body.description,
        userId: httpRequest.body.userId,
        capacity: +httpRequest.body.capacity,
        logoUrl: httpRequest.body.logoUrl,
        information: httpRequest.body.information,
      };

      const isValid = userSchema.safeParse(eventBody);
      if (!isValid.success) {
        const parsedMessage: passedMessageError[] = JSON.parse(
          isValid.error.message,
        );
        return badRequest(new InvalidParamError(parsedMessage[0].validation));
      }

      const result = await createEventUseCase.create(eventBody);

      if (!result) {
        return badRequest(
          new InvalidParamError("userId or categoryId not found"),
        );
      }

      return {
        statusCode: 201,
        body: result.event,
      };
    } catch (error) {
      return serverError();
    }
  }

  static async deleteEvent(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams: string[] = ["id"];
      for (const field of requiredParams) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { id } = httpRequest.params;
      const result = await deleteEventUseCase.delete({ id });

      if (typeof result === "string" && result === "Event not found") {
        return notFound();
      }

      if (typeof result === "string") {
        return badRequest(new Error(result));
      }

      return {
        statusCode: 200,
        body: result.event,
      };
    } catch (error) {
      return serverError();
    }
  }

  static async fetchEvents(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredQuery: string[] = ["page", "limit"];
      for (const query of requiredQuery) {
        if (!httpRequest.query[query]) {
          return badRequest(new MissingQueryError(query));
        }
      }

      for (const query of requiredQuery) {
        if (Number.isNaN(+httpRequest.query[query])) {
          return badRequest(new InvalidQueryError(query));
        }
      }

      const { page, limit } = httpRequest.query;

      const { events, _count } = await fetchEventsUseCase.fetchAll({
        page,
        limit,
      });
      return {
        statusCode: 200,
        body: { events, _count },
      };
    } catch (error) {
      return serverError();
    }
  }

  static async fetchTrending(): Promise<HttpResponse> {
    try {
      const { events } = await fetchTrendingUseCase.fetchTrending();
      return {
        statusCode: 200,
        body: events,
      };
    } catch (error) {
      return serverError();
    }
  }

  static async fetchEventsCities(): Promise<HttpResponse> {
    try {
      const { eventsCities } =
        await fetchEventsCitiesUseCase.fetchEventsCities();
      return {
        statusCode: 200,
        body: eventsCities,
      };
    } catch (error) {
      return serverError();
    }
  }

  static async fetchEventById(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams: string[] = ["id"];
      for (const field of requiredParams) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { id } = httpRequest.params;
      const result = await selectByIdEventUseCase.selectById({ id });

      if (!result) {
        return notFound();
      }

      return {
        statusCode: 200,
        body: result.event,
      };
    } catch (error) {
      return serverError();
    }
  }
}
