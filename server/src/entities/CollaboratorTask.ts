export class CollaboratorTask {
  public readonly id!: string;

  public name!: string;

  public start_date!: Date;
  public end_date?: Date;

  public status!: number;

  public cancel_reason?: string;

  public user_id!: string;
  public user_name!: string;
  public email!: string;

  constructor(props: CollaboratorTask) {
    Object.assign(this, props);
  }
}
