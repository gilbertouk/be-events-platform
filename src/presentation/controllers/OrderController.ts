import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, notFound, serverError } from "../helpers/http-helpers";
import { EventService } from "../../domain/services/EventService";
import { UserService } from "../../domain/services/UserService";
import { CreateOrderUseCase } from "../../usecases/createOrder/CreateOrderUseCase";
import { StrikeService } from "src/infrastructure/stripe/service";
import { z } from "zod";

const eventService = new EventService();
const userService = new UserService();
const createOrderUseCase = new CreateOrderUseCase();
const strikeService = new StrikeService();

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  eventId: z.string(),
  priceStripeId: z.string(),
  quantity: z.number().or(z.string()).pipe(z.coerce.number()),
});

interface passedMessageError {
  validation: string;
  code: string;
  message: string;
  path: [string];
}

export class OrderController {
  static async createCheckoutSession(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        "email",
        "name",
        "priceStripeId",
        "quantity",
        "eventId",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, name, priceStripeId, quantity, eventId } =
        httpRequest.body;
      const isValid = userSchema.safeParse({
        email,
        name,
        priceStripeId,
        quantity,
        eventId,
      });
      if (!isValid.success) {
        const parsedMessage: passedMessageError[] = JSON.parse(
          isValid.error.message,
        );
        return badRequest(new InvalidParamError(parsedMessage[0].validation));
      }

      const event = await eventService.selectByIdEvent({ id: eventId });

      if (!event) {
        return notFound();
      }

      if (!event?.priceStripeId) {
        return notFound();
      }

      const user = await userService.selectByEmailUser({ email });

      if (!user) {
        return notFound();
      }

      const { session } = await strikeService.createCheckoutSession({
        email: user.email,
        name,
        priceStripeId: event.priceStripeId,
        quantity: +quantity,
        eventId: event.id,
      });

      await createOrderUseCase.create({
        userId: user.id,
        eventId: event.id,
        tickets: quantity,
        sessionStripeId: session.id,
        statusStripeId: session.status,
        paymentStripeId: null,
      });

      return {
        statusCode: 201,
        body: session,
      };
    } catch (error) {
      return serverError();
    }
  }
}
