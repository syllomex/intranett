import { ITasksRepository } from "../../repositories/ITasksRepository";
import { IUpdateTaskDTO } from "./UpdateTaskDTO";

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async finish(data: IUpdateTaskDTO) {
    if (!data.id || data.id === "") throw new Error("empty id");
    if (!data.end_date) throw new Error("empty end date");

    const owner = await this.taskRepository.checkOwner(data.id, data.user_id);
    if (!owner) throw new Error("not the task owner");

    await this.taskRepository.finish(data.id, data.end_date);
  }

  async cancel(data: IUpdateTaskDTO) {
    if (!data.id || data.id === "") throw new Error("empty id");
    if (!data.end_date) throw new Error("empty end date");
    if (!data.cancel_reason) throw new Error("empty cancel reason");

    const owner = await this.taskRepository.checkOwner(data.id, data.user_id);
    if (!owner) throw new Error("not the task owner");

    await this.taskRepository.cancel(
      data.id,
      data.end_date,
      data.cancel_reason
    );
  }
}
