import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { IFindUserByIdDTO } from "./FindUserByIdDTO";

export class FindUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IFindUserByIdDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) throw new Error("user not found");

    return user;
  }
}
