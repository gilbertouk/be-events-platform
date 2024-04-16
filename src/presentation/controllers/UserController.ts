import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, notFound, serverError } from "../helpers/http-helpers";
import { CreateUserUseCase } from "../../usecases/createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "../../usecases/deleteUser/DeleteUserUseCase";
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
const deleteUserUseCase = new DeleteUserUseCase();

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

  static async deleteUser(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams: string[] = ["id"];
      for (const field of requiredParams) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { id } = httpRequest.params;

      const result = await deleteUserUseCase.delete({ id });

      if (!result) {
        return notFound();
      }

      return {
        statusCode: 200,
        body: result.user,
      };
    } catch (error) {
      return serverError();
    }
  }
}
