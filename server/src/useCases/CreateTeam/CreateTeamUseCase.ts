import { Team } from "../../entities/Team";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { ICreateTeamDTO } from "./CreateTeamDTO";

export class CreateTeamUseCase {
  constructor(private teamsRepository: ITeamsRepository) {}

  async execute(data: ICreateTeamDTO): Promise<void> {
    if (!data.name || data.name === "") throw new Error("empty name");
    if (!data.manager || data.manager === "") throw new Error("empty manager");

    const team = new Team(data);

    await this.teamsRepository.create(team);
  }
}
