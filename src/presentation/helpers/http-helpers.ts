import { ServerError } from "../errors/server-error";
import { NotFoundError } from "../errors/not-found-error";
import { type HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message,
  },
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: {
    error: new NotFoundError().message,
  },
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    error: new ServerError().message,
  },
});
