import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";
import { ICreateTaskDTO } from "./CreateTaskDTO";

export class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute(data: ICreateTaskDTO) {
    const task = new Task({
      name: data.name,
      start_date: data.start_date,
      user_id: data.user_id,
      status: 0,
    });

    if (!task.name || task.name === "") throw new Error("empty name");
    if (!task.start_date) throw new Error("empty start date");
    if (!task.user_id || task.user_id === "") throw new Error("empty user id");

    await this.taskRepository.create(task);
  }
}
