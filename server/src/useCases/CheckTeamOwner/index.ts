import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { CheckTeamOwnerUseCase } from "./CheckTeamOwnerUseCase";

const teamsRepository = new PostgresTeamsRepository();
const checkTeamOwnerUseCase = new CheckTeamOwnerUseCase(teamsRepository);

export { checkTeamOwnerUseCase };
