import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { CreateTeamController } from "./CreateTeamController";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

const teamsRepository = new PostgresTeamsRepository();
const createTeamUseCase = new CreateTeamUseCase(teamsRepository);
const createTeamController = new CreateTeamController(createTeamUseCase);

export { createTeamUseCase, createTeamController };
