import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";
import { IIndexTaskDTO } from "./IndexTaskDTO";

export class IndexTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async indexByUser(data: IIndexTaskDTO): Promise<Task[]> {
    const tasks = await this.taskRepository.indexByUser(data.user_id);
    return tasks;
  }
}
