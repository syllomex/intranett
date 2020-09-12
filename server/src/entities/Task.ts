import { v4 as uuid } from "uuid";

export class Task {
  public readonly id!: string;

  public name!: string;
  public start_date!: Date;
  public end_date?: Date;
  public status!: number;
  public cancel_reason?: string;

  public user_id!: string;

  constructor(props: Omit<Task, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuid();
  }
}
