import type { HttpRequest, HttpResponse } from "../protocols";
import { MissingParamError } from "../errors";
import { badRequest, serverError, notFound } from "../helpers/http-helpers";
import { CreateCategoryUseCase } from "../../usecases/createCategory/CreateCategoryUseCase";
import { FetchCategoryUseCase } from "../../usecases/fetchCategories/FetchCategoriesUseCase";
import { DeleteCategoryUseCase } from "../../usecases/deleteCategory/DeleteCategoryUseCase";

const createCategoryUseCase = new CreateCategoryUseCase();
const fetchCategoryUseCase = new FetchCategoryUseCase();
const deleteCategoryUseCase = new DeleteCategoryUseCase();

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

  static async deleteCategory(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams: string[] = ["id"];
      for (const field of requiredParams) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { id } = httpRequest.params;

      const result = await deleteCategoryUseCase.delete({ id });

      if (!result) {
        return notFound();
      }

      return {
        statusCode: 200,
        body: result.category,
      };
    } catch (error) {
      return serverError();
    }
  }
}
