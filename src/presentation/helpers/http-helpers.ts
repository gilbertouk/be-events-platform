import { ServerError } from "../errors/server-error";
import { type HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message,
  },
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    error: new ServerError().message,
  },
});
