import { Request, Response } from "express";
import { Task } from "../../entities/Task";
import { IndexTaskUseCase } from "./IndexTaskUseCase";

export class IndexTaskController {
  constructor(private indexTaskUseCase: IndexTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id: user_id } = req.payload;

      const tasks: Task[] = await this.indexTaskUseCase.indexByUser({
        user_id,
      });

      return res.json(tasks);
    } catch (error) {
      let statusCode = 400;
      return res.status(statusCode).json({ message: error.message });
    }
  }
}
