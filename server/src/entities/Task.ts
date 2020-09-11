import { v4 as uuid } from "uuid";

export class Task {
  public readonly id!: string;

  public name: string;
  public start_date: Date;
  public end_date?: Date;
  public status: number;
  public cancel_reason?: string;

  public user_id: string;

  constructor(props: Omit<Task, "id">, id?: string) {
    this.name = props.name;
    this.start_date = props.start_date;
    this.end_date = props.end_date;
    this.status = props.status;
    this.cancel_reason = props.cancel_reason;
    this.user_id = props.user_id;

    if (!id) this.id = uuid();
  }
}
