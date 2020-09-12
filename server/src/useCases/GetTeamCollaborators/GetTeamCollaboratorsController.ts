import { Request, Response } from "express";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

export class GetTeamCollaboratorsController {
  constructor(private getCollaboratorsUseCase: GetTeamCollaboratorsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { team_id } = req.params;
      const { id: manager_id } = req.payload;

      const users = await this.getCollaboratorsUseCase.execute({
        team_id,
        manager_id,
      });

      return res.json(users);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
