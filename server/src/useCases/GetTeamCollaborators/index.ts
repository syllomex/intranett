import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { GetTeamCollaboratorsController } from "./GetTeamCollaboratorsController";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

const collaboratorsRepository = new PostgresTeamCollaboratorsRepository();
const teamsRepository = new PostgresTeamsRepository();

const getTeamCollaboratorsUseCase = new GetTeamCollaboratorsUseCase(
  collaboratorsRepository,
  teamsRepository
);

const getTeamCollaboratorsController = new GetTeamCollaboratorsController(
  getTeamCollaboratorsUseCase
);

export { getTeamCollaboratorsUseCase, getTeamCollaboratorsController };
