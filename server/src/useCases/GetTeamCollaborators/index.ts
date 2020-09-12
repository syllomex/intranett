import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { GetTeamCollaboratorsController } from "./GetTeamCollaboratorsController";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

const collaboratorsRepository = new PostgresTeamCollaboratorsRepository();

const getTeamCollaboratorsUseCase = new GetTeamCollaboratorsUseCase(
  collaboratorsRepository
);

const getTeamCollaboratorsController = new GetTeamCollaboratorsController(
  getTeamCollaboratorsUseCase
);

export { getTeamCollaboratorsUseCase, getTeamCollaboratorsController };
