import { CategoryService } from "../../domain/services/CategoryService";
import { type CreateCategoryInput } from "./CreateCategoryInput";
import { type CreateCategoryOutput } from "./CreateCategoryOutput";

const categoryService = new CategoryService();

export class CreateCategoryUseCase {
  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category: CreateCategoryInput = {
      name: input.name,
      icon: input.icon,
    };

    const createdCategory = await categoryService.create(category);
    return { category: createdCategory };
  }
}
