import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { GetProfileUseCase } from "./GetProfileUseCase";
import { GetProfileController } from "./GetProfileController";

const usersRepository = new PostgresUsersRepository();
const getProfileUseCase = new GetProfileUseCase(usersRepository);
const getProfileController = new GetProfileController(getProfileUseCase);

export { getProfileUseCase, getProfileController };
