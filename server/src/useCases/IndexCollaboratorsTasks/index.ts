import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { IndexCollaboratorsTasksUseCase } from "./IndexCollaboratorsTasksUseCase";
import { IndexCollaboratorsTasksController } from "./IndexCollaboratorsTasksController";

const teamCollaboratorsRepository = new PostgresTeamCollaboratorsRepository();

const indexTeamCollaboratorsTasksUseCase = new IndexCollaboratorsTasksUseCase(
  teamCollaboratorsRepository
);

const indexTeamCollaboratorsTasksController = new IndexCollaboratorsTasksController(
  indexTeamCollaboratorsTasksUseCase
);

export {
  indexTeamCollaboratorsTasksUseCase,
  indexTeamCollaboratorsTasksController,
};
