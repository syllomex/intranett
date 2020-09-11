import { Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../ITasksRepository";

@Entity("tasks")
export class PostgresTaskEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @Column()
  status!: number;

  @Column()
  cancel_reason!: string;

  @Column()
  user_id!: string;
}

export class PostgresTaskRepository implements ITasksRepository {
  async create(task: Task): Promise<void> {
    const repository = getRepository(PostgresTaskEntity);
    const new_task = repository.create(task);

    await repository.save(new_task);
  }

  async indexByUser(user_id: string): Promise<Task[]> {
    const repository = getRepository(PostgresTaskEntity);
    const tasks = await repository.find({
      where: { user_id },
      order: { status: "ASC", start_date: "DESC" },
    });

    return tasks;
  }

  async finish(id: string, end_date: Date): Promise<void> {
    const repository = getRepository(PostgresTaskEntity);
    await repository.update({ id }, { status: 1, end_date });
  }

  async cancel(id: string, end_date: Date, reason: string): Promise<void> {
    const repository = getRepository(PostgresTaskEntity);
    await repository.update(
      { id },
      { status: 2, end_date, cancel_reason: reason }
    );
  }

  async checkOwner(id: string, user_id: string): Promise<boolean> {
    const repository = getRepository(PostgresTaskEntity);
    const task = await repository.findOne({ id, user_id });

    if (task) return true;

    return false;
  }
}
