import { type CreateUserInput } from "../../usecases/createUser/CreateUserInput";
import { type IUser } from "../models/User";
import { database } from "../../infrastructure/database/";

export class UserService {
  async create(user: CreateUserInput): Promise<IUser> {
    try {
      const userModel = await database.user.create({
        data: {
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          role: user.role,
        },
      });

      return userModel;
    } catch (error) {
      throw new Error();
    }
  }
}
