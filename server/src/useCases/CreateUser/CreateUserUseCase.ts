import { IUsersRepository } from "../../repositories/IUsersRespository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { Password } from "../../utils/password";

export class CreateUserUseCase {
  private password = new Password();

  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    if (!data.email || data.email === "") throw new Error("empty email");
    if (!data.name || data.name === "") throw new Error("empty name");
    if (!data.password || data.password === "")
      throw new Error("empty password");

    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) throw new Error("user already exists");

    const hashed_password = await this.password.hash(data.password);
    if (!hashed_password) throw new Error("error on hashing password");

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashed_password,
    });

    await this.usersRepository.save(user);
  }
}
