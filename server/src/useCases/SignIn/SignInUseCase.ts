import { IUsersRepository } from "../../repositories/IUsersRespository";
import { Auth } from "../../services/auth";
import { Password } from "../../utils/password";
import { ISignInDTO } from "./SignInDTO";

export interface Payload {
  id: string;
  exp: string;
  iat: string;
  manager: boolean;
}

export class SignInUseCase {
  private password = new Password();
  private auth = new Auth();

  constructor(private userRepository: IUsersRepository) {}

  async execute(data: ISignInDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error("user not found");

    const correct_password = await this.password.compare(
      data.password,
      user.password
    );
    if (!correct_password) throw new Error("invalid password");

    const isManager = user.access === 1;
    const access_token = this.auth.sign(user.id, isManager);

    if (!access_token) throw new Error("error on generating access token");

    return access_token;
  }
}
