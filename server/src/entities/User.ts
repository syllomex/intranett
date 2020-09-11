import { v4 as uuid } from "uuid";

export class User {
  public readonly id!: string;

  public name: string;
  public email: string;
  public password: string;
  public access?: number;

  constructor(props: Omit<User, "id">, id?: string) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.access = 0;

    if (!id) this.id = uuid();
  }
}
