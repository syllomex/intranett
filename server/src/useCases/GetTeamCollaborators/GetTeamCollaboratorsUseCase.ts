import { User } from "../../entities/User";
import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { IGetTeamCollaboratorsDTO } from "./GetTeamCollaboratorsDTO";

export class GetTeamCollaboratorsUseCase {
  constructor(
    private collaboratorsRepository: ITeamCollaboratorsRepository,
    private teamsRepository: ITeamsRepository
  ) {}

  async execute(data: IGetTeamCollaboratorsDTO): Promise<User[]> {
    const isOwner = await this.teamsRepository.checkOwner(
      data.team_id,
      data.manager_id
    );
    if (!isOwner) throw new Error("not the team owner");

    const users = await this.collaboratorsRepository.getUsersFromTeam(
      data.team_id
    );
    return users;
  }
}
