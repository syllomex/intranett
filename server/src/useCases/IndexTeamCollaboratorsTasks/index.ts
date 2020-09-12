import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { IndexTeamCollaboratorsTasksUseCase } from "./IndexTeamCollaboratorsTasksUseCase";
import { IndexTeamCollaboratorsTasksController } from "./IndexTeamCollaboratorsTasksController";

const teamCollaboratorsRepository = new PostgresTeamCollaboratorsRepository();

const indexTeamCollaboratorsTasksUseCase = new IndexTeamCollaboratorsTasksUseCase(
  teamCollaboratorsRepository
);

const indexTeamCollaboratorsTasksController = new IndexTeamCollaboratorsTasksController(
  indexTeamCollaboratorsTasksUseCase
);

export {
  indexTeamCollaboratorsTasksUseCase,
  indexTeamCollaboratorsTasksController,
};
