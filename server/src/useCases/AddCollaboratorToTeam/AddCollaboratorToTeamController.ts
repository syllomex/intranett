import { Request, Response } from "express";
import { CheckTeamOwnerUseCase } from "../CheckTeamOwner/CheckTeamOwnerUseCase";
import { FindUserByIdUseCase } from "../FindUserById/FindUserByIdUseCase";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

export class AddCollaboratorToTeamController {
  constructor(
    private addCollaboratorToTeamUseCase: AddCollaboratorToTeamUseCase,
    private checkTeamOwnerUseCase: CheckTeamOwnerUseCase,
    private findUserById: FindUserByIdUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id, email } = req.body;

      const { id: manager_id } = req.payload;
      const isOwner = await this.checkTeamOwnerUseCase.execute({
        team_id: id,
        manager_id,
      });
      if (!isOwner) throw new Error("not the team owner");

      const user = await this.findUserById.execute({ email });

      await this.addCollaboratorToTeamUseCase.execute({ id, user_id: user.id });

      return res.status(201).send();
    } catch (error) {
      let code = 400;

      if (error.message === "not the team owner") code = 401;

      return res.status(code).json({ message: error.message });
    }
  }
}
