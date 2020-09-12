import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { IndexTeamsByManagerController } from "./IndexTeamsByManagerController";
import { IndexTeamsByManagerUseCase } from "./IndexTeamsByManagerUseCase";

const teamsRepository = new PostgresTeamsRepository();
const indexTeamsByManager = new IndexTeamsByManagerUseCase(teamsRepository);

const indexTeamsByManagerController = new IndexTeamsByManagerController(
  indexTeamsByManager
);

export { indexTeamsByManager, indexTeamsByManagerController };
