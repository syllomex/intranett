import { Request, Response } from "express";
import { CheckTeamOwnerUseCase } from "../CheckTeamOwner/CheckTeamOwnerUseCase";
import { GetTeamCollaboratorsUseCase } from "./GetTeamCollaboratorsUseCase";

export class GetTeamCollaboratorsController {
  constructor(
    private getCollaboratorsUseCase: GetTeamCollaboratorsUseCase,
    private checkTeamOwnerUseCase: CheckTeamOwnerUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const { id: manager_id } = req.payload;
      const isOwner = await this.checkTeamOwnerUseCase.execute({
        team_id: id,
        manager_id,
      });
      if (!isOwner) throw new Error("not the team owner");

      const users = await this.getCollaboratorsUseCase.execute({ id });

      return res.json(users);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
