import { Request, Response } from "express";
import { CheckTeamOwnerUseCase } from "../CheckTeamOwner/CheckTeamOwnerUseCase";
import { IndexTeamCollaboratorsTasksUseCase } from "./IndexTeamCollaboratorsTasksUseCase";

export class IndexTeamCollaboratorsTasksController {
  constructor(
    private indexTeamCollaboratorsTasksUseCase: IndexTeamCollaboratorsTasksUseCase,
    private checkTeamOwnerUseCase: CheckTeamOwnerUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { team_id } = req.params;

      const { id: manager_id } = req.payload;
      const isOwner = await this.checkTeamOwnerUseCase.execute({
        team_id,
        manager_id,
      });
      if (!isOwner) throw new Error("not the team owner");

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
