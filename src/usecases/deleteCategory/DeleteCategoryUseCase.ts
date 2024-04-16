import { CategoryService } from "../../domain/services/CategoryService";
import { type DeleteCategoryInput } from "./DeleteCategoryInput";
import { type DeleteCategoryOutput } from "./DeleteCategoryOutput";

const categoryService = new CategoryService();

export class DeleteCategoryUseCase {
  async delete(
    input: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput | null> {
    const category: DeleteCategoryInput = {
      id: input.id,
    };
    const categoryDeleted = await categoryService.delete(category);

    if (!categoryDeleted) {
      return null;
    }

    return { category: categoryDeleted };
  }
}
