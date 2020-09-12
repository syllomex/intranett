import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { IIndexTeamCollaboratorsTasksDTO } from "./IndexTeamCollaboratorsTasksDTO";

export class IndexTeamCollaboratorsTasksUseCase {
  constructor(private collaboratorsRepository: ITeamCollaboratorsRepository) {}

  async execute(data: IIndexTeamCollaboratorsTasksDTO) {
    const tasks = await this.collaboratorsRepository.indexTeamCollaboratorsTasks(
      data.team_id
    );
    
    return tasks;
  }
}
