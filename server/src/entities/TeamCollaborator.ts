import { v4 as uuid } from "uuid";

export class TeamCollaborator {
  public readonly id!: string;

  public team_id!: string;
  public user_id!: string;

  constructor(props: Omit<TeamCollaborator, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuid();
  }
}
