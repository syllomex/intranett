import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { IndexCollaboratorsTasksUseCase } from "./IndexCollaboratorsTasksUseCase";
import { IndexCollaboratorsTasksController } from "./IndexCollaboratorsTasksController";
import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";

const teamCollaboratorsRepository = new PostgresTeamCollaboratorsRepository();
const teamsRepository = new PostgresTeamsRepository();

const indexTeamCollaboratorsTasksUseCase = new IndexCollaboratorsTasksUseCase(
  teamCollaboratorsRepository,
  teamsRepository
);

const indexTeamCollaboratorsTasksController = new IndexCollaboratorsTasksController(
  indexTeamCollaboratorsTasksUseCase
);

export {
  indexTeamCollaboratorsTasksUseCase,
  indexTeamCollaboratorsTasksController,
};
