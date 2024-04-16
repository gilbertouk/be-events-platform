import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
import { CreateUserUseCase } from "../../usecases/createUser/CreateUserUseCase";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
});

interface passedMessageError {
  validation: string;
  code: string;
  message: string;
  path: [string];
}

const createUserUseCase = new CreateUserUseCase();

export class UserController {
  static async crateUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = [
        "firstName",
        "surname",
        "email",
        "role",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { firstName, surname, email, role } = httpRequest.body;

      const isValid = userSchema.safeParse({ firstName, surname, email, role });
      if (!isValid.success) {
        const parsedMessage: passedMessageError[] = JSON.parse(
          isValid.error.message,
        );
        return badRequest(new InvalidParamError(parsedMessage[0].validation));
      }

      const { user } = await createUserUseCase.create({
        firstName,
        surname,
        email,
        role,
      });

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return serverError();
    }
  }
}
