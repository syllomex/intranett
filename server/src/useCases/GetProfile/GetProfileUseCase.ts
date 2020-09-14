import { IUsersRepository } from "../../repositories/IUsersRespository";
import { IGetProfileDTO } from "./GetProfileDTO";

export class GetProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IGetProfileDTO) {
    const user = await this.usersRepository.findById(data.id);
    return user;
  }
}
