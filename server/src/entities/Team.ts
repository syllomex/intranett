import { v4 as uuid } from "uuid";

export class Team {
  public readonly id!: string;

  public name!: string;
  public manager!: string;

  constructor(props: Omit<Team, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuid();
  }
}
