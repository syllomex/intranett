import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { AddCollaboratorToTeamController } from "./AddCollaboratorToTeamController";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

const collaboratorRepository = new PostgresTeamCollaboratorsRepository();
const usersRepository = new PostgresUsersRepository();
const teamsRepository = new PostgresTeamsRepository();

const addCollaboratorToTeamUseCase = new AddCollaboratorToTeamUseCase(
  collaboratorRepository,
  usersRepository,
  teamsRepository
);

const addCollaboratorToTeamController = new AddCollaboratorToTeamController(
  addCollaboratorToTeamUseCase
);

export { addCollaboratorToTeamUseCase, addCollaboratorToTeamController };
