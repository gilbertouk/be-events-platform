import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingQueryError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
import { SignUploadImageUseCase } from "../../usecases/signUploadImage/SignUploadImageUseCase";

const signUploadImageUseCase = new SignUploadImageUseCase();

export class CloudinaryController {
  static async signUploadImage(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse> {
    try {
      const requiredQuery: string[] = ["folder"];
      for (const query of requiredQuery) {
        if (!httpRequest.query[query]) {
          return badRequest(new MissingQueryError(query));
        }
      }

      const { folder } = httpRequest.query;

      const result = await signUploadImageUseCase.signUploadImage(
        folder as string,
      );

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      return serverError();
    }
  }
}
