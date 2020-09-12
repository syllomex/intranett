import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { IIndexTeamsByManagerDTO } from "./IndexTeamsByManagerDTO";

export class IndexTeamsByManagerUseCase {
  constructor(private teamsRepository: ITeamsRepository) {}

  async execute(data: IIndexTeamsByManagerDTO) {
    const teams = await this.teamsRepository.findByManager(data.id);
    return teams;
  }
}
