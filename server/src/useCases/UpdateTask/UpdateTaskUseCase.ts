import { ITasksRepository } from "../../repositories/ITasksRepository";
import { IUpdateTaskDTO } from "./UpdateTaskDTO";

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async finish(data: IUpdateTaskDTO) {
    if (!data.id || data.id === "") throw new Error("empty id");
    if (!data.end_date) throw new Error("empty end date");

    await this.taskRepository.finish(data.id, data.end_date);
  }

  async cancel(data: IUpdateTaskDTO) {
    if (!data.id || data.id === "") throw new Error("empty id");
    if (!data.end_date) throw new Error("empty end date");
    if (!data.cancel_reason) throw new Error("empty cancel reason");

    await this.taskRepository.cancel(
      data.id,
      data.end_date,
      data.cancel_reason
    );
  }
}
