import { type CreateCategoryInput } from "../../usecases/createCategory/CreateCategoryInput";
import { type ICategory } from "../models/Category";
import { database } from "../../infrastructure/database/";
import { type DeleteCategoryInput } from "src/usecases/deleteCategory/DeleteCategoryInput";

export class CategoryService {
  async create(category: CreateCategoryInput): Promise<ICategory> {
    try {
      const categoryModel = await database.category.create({
        data: { name: category.name, icon: category.icon },
      });
      return categoryModel;
    } catch (error) {
      throw new Error();
    }
  }

  async fetchAll(): Promise<ICategory[]> {
    try {
      const categories = await database.category.findMany({
        orderBy: { name: "asc" },
      });
      return categories;
    } catch (error) {
      throw new Error();
    }
  }

  async delete(category: DeleteCategoryInput): Promise<ICategory | null> {
    try {
      const categoryToDelete = await database.category.findUnique({
        where: { id: category.id },
      });

      if (!categoryToDelete) {
        return null;
      }

      const categoryModel = await database.category.delete({
        where: { id: category.id },
      });

      return categoryModel;
    } catch (error) {
      throw new Error();
    }
  }
}
