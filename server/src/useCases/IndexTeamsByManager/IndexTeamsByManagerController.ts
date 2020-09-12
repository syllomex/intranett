import { Request, Response } from "express";
import { IndexTeamsByManagerUseCase } from "./IndexTeamsByManagerUseCase";

export class IndexTeamsByManagerController {
  constructor(private indexTeamsByManagerUseCase: IndexTeamsByManagerUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.payload;
      const teams = await this.indexTeamsByManagerUseCase.execute({ id });

      return res.json(teams);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
