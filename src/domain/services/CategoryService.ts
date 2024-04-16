import { type CreateCategoryInput } from "../../usecases/createCategory/CreateCategoryInput";
import { type ICategory } from "../models/Category";
import { database } from "../../infrastructure/database/";

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
}
