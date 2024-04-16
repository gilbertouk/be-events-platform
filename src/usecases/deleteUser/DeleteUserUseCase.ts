import { UserService } from "../../domain/services/UserService";
import { type DeleteUserInput } from "./DeleteUserInput";
import { type DeleteUserOutput } from "./DeleteUserOutput";

const userService = new UserService();

export class DeleteUserUseCase {
  async delete(input: DeleteUserInput): Promise<DeleteUserOutput | null> {
    const user: DeleteUserInput = {
      id: input.id,
    };
    const userDeleted = await userService.delete(user);

    if (!userDeleted) {
      return null;
    }

    return { user: userDeleted };
  }
}
