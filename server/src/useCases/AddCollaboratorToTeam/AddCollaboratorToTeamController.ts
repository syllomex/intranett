import { Request, Response } from "express";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

export class AddCollaboratorToTeamController {
  constructor(
    private addCollaboratorToTeamUseCase: AddCollaboratorToTeamUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { team_id } = req.params;
      const { email } = req.body;

      const { id: manager_id } = req.payload;

      await this.addCollaboratorToTeamUseCase.execute({
        team_id,
        email,
        manager_id,
      });

      return res.status(201).send();
    } catch (error) {
      let code = 400;

      if (error.message === "not the team owner") code = 401;
      else if (error.message === "user already in this team") code = 409;

      return res.status(code).json({ message: error.message });
    }
  }
}
