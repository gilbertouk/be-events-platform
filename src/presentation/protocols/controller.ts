import type { HttpRequest, HttpResponse } from "./http";

export interface ICategoryController {
  crateCategory: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
