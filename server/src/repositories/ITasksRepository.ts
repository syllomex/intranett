import { Task } from "../entities/Task";

export interface ITasksRepository {
  create(task: Task): Promise<void>;
  indexByUser(user_id: string): Promise<Task[]>;
  finish(id: string, end_date: Date): Promise<void>;
  cancel(id: string, end_date: Date, reason: string): Promise<void>;
  checkOwner(id: string, user_id: string): Promise<boolean>;
}
