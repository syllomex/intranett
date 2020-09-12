import { TeamCollaborator } from "../../entities/TeamCollaborator";
import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { IAddCollaboratorToTeamDTO } from "./AddCollaboratorToTeamDTO";

export class AddCollaboratorToTeamUseCase {
  constructor(
    private teamCollaboratorsRepository: ITeamCollaboratorsRepository
  ) {}

  async execute(data: IAddCollaboratorToTeamDTO): Promise<void> {
    if (!data.id || data.id === "") throw new Error("empty id");
    if (!data.user_id || data.user_id === "") throw new Error("empty user");

    const teamCollaborator = new TeamCollaborator({
      team_id: data.id,
      user_id: data.user_id,
    });

    await this.teamCollaboratorsRepository.addUserToTeam(teamCollaborator);
  }
}
