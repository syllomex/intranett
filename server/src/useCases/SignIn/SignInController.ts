import { Request, Response } from "express";
import { SignInUseCase } from "./SignInUseCase";

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const access_token = await this.signInUseCase.execute({
        email,
        password,
      });

      return res.status(200).json({ access_token });
    } catch (error) {
      let statusCode = 400;

      if (error.message === "invalid password") statusCode = 401;
      else if (error.message === "user not found") statusCode = 401;

      return res.status(statusCode).json({ message: error.message });
    }
  }
}
