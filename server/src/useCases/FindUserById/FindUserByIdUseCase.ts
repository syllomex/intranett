import { User } from "../../entities/User";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { IFindUserByIdDTO } from "./FindUserByIdDTO";

export class FindUserByIdUseCase {
  constructor(private usersRepository: PostgresUsersRepository) {}

  async execute(data: IFindUserByIdDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(data.email);
    return user;
  }
}
