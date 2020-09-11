import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      await this.createUserUseCase.execute({ name, email, password });

      return res.status(201).send();
    } catch (error) {
      let statusCode = 400;

      if (error.message === "user already exists") statusCode = 409;

      return res.status(statusCode).json({
        message: error.message || "unexpected error",
      });
    }
  }
}
