import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { findUserByIdUseCase } from "../FindUserById";
import { AddCollaboratorToTeamController } from "./AddCollaboratorToTeamController";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

const collaboratorRepository = new PostgresTeamCollaboratorsRepository();

const addCollaboratorToTeamUseCase = new AddCollaboratorToTeamUseCase(
  collaboratorRepository
);

const addCollaboratorToTeamController = new AddCollaboratorToTeamController(
  addCollaboratorToTeamUseCase,
  findUserByIdUseCase
);

export { addCollaboratorToTeamUseCase, addCollaboratorToTeamController };
