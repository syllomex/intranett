import { Request, Response } from "express";
import { IndexTeamCollaboratorsTasksUseCase } from "./IndexTeamCollaboratorsTasksUseCase";

export class IndexTeamCollaboratorsTasksController {
  constructor(
    private indexTeamCollaboratorsTasksUseCase: IndexTeamCollaboratorsTasksUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { team_id } = req.params;

      const tasks = await this.indexTeamCollaboratorsTasksUseCase.execute({
        team_id,
      });

      return res.json(tasks);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
