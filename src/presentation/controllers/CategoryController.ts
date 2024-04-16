import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
import { CreateCategoryUseCase } from "../../usecases/createCategory/CreateCategoryUseCase";
import { FetchCategoryUseCase } from "../../usecases/fetchCategories/FetchCategoriesUseCase";

const createCategoryUseCase = new CreateCategoryUseCase();
const fetchCategoryUseCase = new FetchCategoryUseCase();

export class CategoryController {
  static async crateCategory(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ["name", "icon"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, icon } = httpRequest.body;

      const { category } = await createCategoryUseCase.execute({ name, icon });

      return {
        statusCode: 201,
        body: category,
      };
    } catch (error) {
      return serverError();
    }
  }

  static async getCategories(): Promise<HttpResponse> {
    try {
      const { categories } = await fetchCategoryUseCase.fetchAll();

      return {
        statusCode: 200,
        body: categories,
      };
    } catch (error) {
      return serverError();
    }
  }
}
