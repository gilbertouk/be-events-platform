import { UserService } from "../../domain/services/UserService";
import { type SelectByEmailUserInput } from "./SelectByEmailUserInput";
import { type SelectByEmailUserOutput } from "./SelectByEmailUserOutput";

const userService = new UserService();

export class SelectByEmailUserUseCase {
  async selectByEmail(
    input: SelectByEmailUserInput,
  ): Promise<SelectByEmailUserOutput | null> {
    const user: SelectByEmailUserInput = {
      email: input.email,
    };
    const userSelected = await userService.selectByEmailUser(user);

    if (!userSelected) {
      return null;
    }

    return { user: userSelected };
  }
}
