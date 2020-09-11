import { Request, Response } from "express";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, start_date } = req.body;
      const { id: user_id } = req.payload;

      await this.createTaskUseCase.execute({ name, start_date, user_id });

      return res.status(201).send();
    } catch (error) {
      let statusCode = 400;
      return res.status(statusCode).json({ message: error.message });
    }
  }
}
