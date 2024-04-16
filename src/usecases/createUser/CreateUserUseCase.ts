import { UserService } from "../../domain/services/UserService";
import { type CreateUserInput } from "./CreateUserInput";
import { type CreateUserOutput } from "./CreateUserOutput";

const userService = new UserService();

export class CreateUserUseCase {
  async create(input: CreateUserInput): Promise<CreateUserOutput> {
    const user: CreateUserInput = {
      firstName: input.firstName,
      surname: input.surname,
      email: input.email,
      role: input.role,
    };

    const createdUser = await userService.create(user);
    return { user: createdUser };
  }
}
