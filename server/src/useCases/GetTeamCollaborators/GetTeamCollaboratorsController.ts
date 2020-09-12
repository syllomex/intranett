import { Request, Response } from "express";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

export class GetTeamCollaboratorsController {
  constructor(private getCollaboratorsUseCase: GetTeamCollaboratorsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const users = await this.getCollaboratorsUseCase.execute({ id });

      return res.json(users);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
