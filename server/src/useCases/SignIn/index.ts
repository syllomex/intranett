import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";

const usersRepository = new PostgresUsersRepository();
const signInUseCase = new SignInUseCase(usersRepository);
const signInController = new SignInController(signInUseCase);

export { signInUseCase, signInController };
