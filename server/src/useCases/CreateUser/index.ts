import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";

const postgresUserRepository = new PostgresUsersRepository();
const createUserUseCase = new CreateUserUseCase(postgresUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
