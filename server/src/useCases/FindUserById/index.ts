import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

const usersRepository = new PostgresUsersRepository();
const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);

export { findUserByIdUseCase };
