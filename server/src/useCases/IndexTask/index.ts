import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";
import { IndexTaskController } from "./IndexTaskController";
import { IndexTaskUseCase } from "./IndexTaskUseCase";

const taskRepository = new PostgresTaskRepository();
const indexTaskUseCase = new IndexTaskUseCase(taskRepository);
const indexTaskController = new IndexTaskController(indexTaskUseCase);

export { indexTaskUseCase, indexTaskController };
