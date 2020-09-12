import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { checkTeamOwnerUseCase } from "../CheckTeamOwner";
import { findUserByIdUseCase } from "../FindUserById";
import { AddCollaboratorToTeamController } from "./AddCollaboratorToTeamController";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

const collaboratorRepository = new PostgresTeamCollaboratorsRepository();

const addCollaboratorToTeamUseCase = new AddCollaboratorToTeamUseCase(
  collaboratorRepository
);

const addCollaboratorToTeamController = new AddCollaboratorToTeamController(
  addCollaboratorToTeamUseCase,
  checkTeamOwnerUseCase,
  findUserByIdUseCase
);

export { addCollaboratorToTeamUseCase, addCollaboratorToTeamController };
