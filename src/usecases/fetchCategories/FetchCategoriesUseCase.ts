import { CategoryService } from "../../domain/services/CategoryService";
import { type FetchCategoryOutput } from "../fetchCategories/FetchCategoriesOutput";

const categoryService = new CategoryService();

export class FetchCategoryUseCase {
  async fetchAll(): Promise<FetchCategoryOutput> {
    const categories = await categoryService.fetchAll();
    return { categories };
  }
}
