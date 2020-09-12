import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { IndexTeamCollaboratorsTasksUseCase } from "./IndexTeamCollaboratorsTasksUseCase";
import { IndexTeamCollaboratorsTasksController } from "./IndexTeamCollaboratorsTasksController";
import { checkTeamOwnerUseCase } from "../CheckTeamOwner";

const teamCollaboratorsRepository = new PostgresTeamCollaboratorsRepository();

const indexTeamCollaboratorsTasksUseCase = new IndexTeamCollaboratorsTasksUseCase(
  teamCollaboratorsRepository
);

const indexTeamCollaboratorsTasksController = new IndexTeamCollaboratorsTasksController(
  indexTeamCollaboratorsTasksUseCase,
  checkTeamOwnerUseCase
);

export {
  indexTeamCollaboratorsTasksUseCase,
  indexTeamCollaboratorsTasksController,
};
