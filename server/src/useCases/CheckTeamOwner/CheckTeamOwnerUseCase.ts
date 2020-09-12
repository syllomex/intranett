import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { ICheckTeamOwnerDTO } from "./CheckTeamOwnerDTO";

export class CheckTeamOwnerUseCase {
  constructor(private teamsRepository: ITeamsRepository) {}

  async execute(data: ICheckTeamOwnerDTO): Promise<boolean> {
    const isOwner = await this.teamsRepository.checkOwner(
      data.team_id,
      data.manager_id
    );

    return isOwner;
  }
}
