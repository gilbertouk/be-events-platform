import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
import { CreateEventUseCase } from "../../usecases/createEvent/CreateEventUseCase";
// import { DeleteUserUseCase } from "../../usecases/deleteUser/DeleteUserUseCase";
// import { SelectByEmailUserUseCase } from "../../usecases/selectUserById/SelectByEmailUserUseCase";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  dateStart: z.date(),
  dateEnd: z.date(),
  location: z.string(),
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

export class EventController {
  static async crateEvent(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        "name",
        "dateStart",
        "dateEnd",
        "location",
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
        location: httpRequest.body.location,
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
        console.log(parsedMessage);
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
}
