import { User } from "../../entities/User";
import { Entity, PrimaryColumn, Column, getRepository } from "typeorm";
import { IUsersRepository } from "../IUsersRespository";

@Entity("users")
export class PostgresUserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  access!: number;
}

export class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const repository = getRepository(PostgresUserEntity);
    const user = await repository.findOne({ where: { email } });

    return user;
  }

  async save(user: User): Promise<void> {
    const repository = getRepository(PostgresUserEntity);
    const new_user = repository.create(user);
    await repository.save(new_user);
  }
}
