import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";
import { UpdateTaskController } from "./UpdateTaskController";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

const taskRepository = new PostgresTaskRepository();
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

const updateTaskController = new UpdateTaskController(updateTaskUseCase);

export { updateTaskUseCase, updateTaskController };
