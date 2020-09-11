import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";

export class CheckTaskUseCase {
  constructor(private taskRepository: PostgresTaskRepository) {}

  async checkOwner(id: string, user_id: string): Promise<boolean> {
    const result = await this.taskRepository.checkOwner(id, user_id);

    return result;
  }
}
