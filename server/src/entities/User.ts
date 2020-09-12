import { v4 as uuid } from "uuid";

export class User {
  public readonly id!: string;

  public name!: string;
  public email!: string;
  public password!: string;
  public access?: number;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);
    this.access = 0;

    if (!id) this.id = uuid();
  }
}
