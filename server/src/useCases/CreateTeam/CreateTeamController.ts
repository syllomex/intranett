import { Request, Response } from "express";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

export class CreateTeamController {
  constructor(private createTeamUseCase: CreateTeamUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const { id: manager } = req.payload;

      await this.createTeamUseCase.execute({ name, manager });

      return res.status(201).send();
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
