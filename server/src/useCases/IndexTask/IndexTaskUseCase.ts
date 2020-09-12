import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

export class IndexTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async indexByUser(user_id: string): Promise<Task[]> {
    const tasks = await this.taskRepository.indexByUser(user_id);
    return tasks;
  }
}
