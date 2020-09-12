import { Request, Response } from "express";
import { FindUserByIdUseCase } from "../FindUserById/FindUserByIdUseCase";
import { AddCollaboratorToTeamUseCase } from "./AddCollaboratorToTeamUseCase";

export class AddCollaboratorToTeamController {
  constructor(
    private addCollaboratorToTeamUseCase: AddCollaboratorToTeamUseCase,
    private findUserById: FindUserByIdUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id, email } = req.body;

      const user = await this.findUserById.execute({ email });

      await this.addCollaboratorToTeamUseCase.execute({ id, user_id: user.id });

      return res.status(201).send();
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
