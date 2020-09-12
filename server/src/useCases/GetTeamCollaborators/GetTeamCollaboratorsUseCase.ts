import { User } from "../../entities/User";
import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { IGetTeamCollaboratorsDTO } from "./GetTeamCollaboratorsDTO";

export class GetTeamCollaboratorsUseCase {
  constructor(
    private collaboratorsRepository: ITeamCollaboratorsRepository
  ) {}

  async execute(data: IGetTeamCollaboratorsDTO): Promise<User[]> {
    const users = await this.collaboratorsRepository.getUsersFromTeam(data.id);
    return users;
  }
}
