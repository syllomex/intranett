import { TeamCollaborator } from "../../entities/TeamCollaborator";
import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { IAddCollaboratorToTeamDTO } from "./AddCollaboratorToTeamDTO";

export class AddCollaboratorToTeamUseCase {
  constructor(
    private teamCollaboratorsRepository: ITeamCollaboratorsRepository,
    private usersRepository: IUsersRepository,
    private teamsRepository: ITeamsRepository
  ) {}

  async execute(data: IAddCollaboratorToTeamDTO): Promise<void> {
    if (!data.team_id || data.team_id === "") throw new Error("empty id");
    if (!data.email || data.email === "") throw new Error("empty user");

    const isOwner = await this.teamsRepository.checkOwner(
      data.team_id,
      data.manager_id
    );
    if (!isOwner) throw new Error("not the team owner");

    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) throw new Error("user not found");

    const alreadyInTeam = await this.teamCollaboratorsRepository.checkUserAlreadyInTeam(
      data.team_id,
      user.id
    );
    if (alreadyInTeam) throw new Error("user already in this team");

    const teamCollaborator = new TeamCollaborator({
      team_id: data.team_id,
      user_id: user.id,
    });

    await this.teamCollaboratorsRepository.addUserToTeam(teamCollaborator);
  }
}
