import { Task } from "../../entities/Task";
import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";

export class IndexTaskUseCase {
  constructor(private taskRepository: PostgresTaskRepository) {}

  async indexByUser(user_id: string): Promise<Task[]> {
    const tasks = await this.taskRepository.indexByUser(user_id);
    return tasks;
  }
}
