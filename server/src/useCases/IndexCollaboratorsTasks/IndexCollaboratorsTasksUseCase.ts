import { ITeamCollaboratorsRepository } from "../../repositories/ITeamCollaboratorsRepository";
import { IIndexCollaboratorsTasksDTO } from "./IndexCollaboratorsTasksDTO";

export class IndexCollaboratorsTasksUseCase {
  constructor(private collaboratorsRepository: ITeamCollaboratorsRepository) {}

  async execute(data: IIndexCollaboratorsTasksDTO) {
    const tasks = await this.collaboratorsRepository.indexTeamCollaboratorsTasks(
      data.manager_id
    );
    return tasks;
  }
}
