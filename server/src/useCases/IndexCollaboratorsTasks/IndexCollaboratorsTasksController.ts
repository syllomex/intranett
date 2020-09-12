import { Request, Response } from "express";
import { IndexCollaboratorsTasksUseCase } from "./IndexCollaboratorsTasksUseCase";

export class IndexCollaboratorsTasksController {
  constructor(
    private indexCollaboratorsTasksUseCase: IndexCollaboratorsTasksUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id: manager_id } = req.payload;

      const tasks = await this.indexCollaboratorsTasksUseCase.execute({
        manager_id,
      });

      return res.json(tasks);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
