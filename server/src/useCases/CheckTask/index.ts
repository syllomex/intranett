import { PostgresTaskRepository } from "../../repositories/implementations/PostgresTasksRepository";
import { CheckTaskUseCase } from "./CheckTaskUseCase";

const taskRepository = new PostgresTaskRepository();
const checkTaskUseCase = new CheckTaskUseCase(taskRepository);

export { checkTaskUseCase };
