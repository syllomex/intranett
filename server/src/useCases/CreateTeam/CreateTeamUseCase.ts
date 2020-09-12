import { Team } from "../../entities/Team";
import { PostgresTeamsRepository } from "../../repositories/implementations/PostgresTeamsRepository";
import { ICreateTeamDTO } from "./CreateTeamDTO";

export class CreateTeamUseCase {
  constructor(private teamsRepository: PostgresTeamsRepository) {}

  async execute(data: ICreateTeamDTO): Promise<void> {
    if (!data.name || data.name === "") throw new Error("empty name");
    if (!data.manager || data.manager === "") throw new Error("empty manager");

    const team = new Team(data);

    await this.teamsRepository.create(team);
  }
}
