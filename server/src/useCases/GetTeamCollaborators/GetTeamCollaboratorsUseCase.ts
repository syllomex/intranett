import { User } from "../../entities/User";
import { PostgresTeamCollaboratorsRepository } from "../../repositories/implementations/PostgresTeamCollaboratorsRepository";
import { IGetTeamCollaboratorsDTO } from "./GetTeamCollaboratorsDTO";

export class GetTeamCollaboratorsUseCase {
  constructor(
    private collaboratorsRepository: PostgresTeamCollaboratorsRepository
  ) {}

  async execute(data: IGetTeamCollaboratorsDTO): Promise<User[]> {
    const users = await this.collaboratorsRepository.getUsersFromTeam(data.id);
    return users;
  }
}
