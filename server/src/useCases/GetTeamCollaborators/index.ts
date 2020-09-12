import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { checkTeamOwnerUseCase } from "../CheckTeamOwner";
import { GetTeamCollaboratorsController } from "./GetTeamCollaboratorsController";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

const collaboratorsRepository = new PostgresTeamCollaboratorsRepository();

const getTeamCollaboratorsUseCase = new GetTeamCollaboratorsUseCase(
  collaboratorsRepository
);

const getTeamCollaboratorsController = new GetTeamCollaboratorsController(
  getTeamCollaboratorsUseCase,
  checkTeamOwnerUseCase
);

export { getTeamCollaboratorsUseCase, getTeamCollaboratorsController };
