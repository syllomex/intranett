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
  async save(user: User): Promise<void> {
    const repository = getRepository(PostgresUserEntity);
    const new_user = repository.create(user);
    await repository.save(new_user);
  }

  async findByEmail(email: string): Promise<User> {
    const repository = getRepository(PostgresUserEntity);
    const user = await repository.findOne({ where: { email } });

    if (!user) throw new Error("user not found");

    return user;
  }

  async findById(id: string): Promise<User> {
    const repository = getRepository(PostgresUserEntity);

    const user = await repository.findOne(id, {
      select: ["id", "name", "email", "access"],
    });

    if (!user) throw new Error("user not found");

    return user;
  }
}
