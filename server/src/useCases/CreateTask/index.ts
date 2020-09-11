import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";
import { CreateTaskController } from "./CreateTaskController";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

const taskRepository = new PostgresTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskUseCase, createTaskController };
