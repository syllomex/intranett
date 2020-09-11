import { Request, Response } from "express";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";
import { CheckTaskUseCase } from "../CheckTask/CheckTaskUseCase";

export class UpdateTaskController {
  constructor(
    private updateTaskUseCase: UpdateTaskUseCase,
    private checkTaskUseCase: CheckTaskUseCase
  ) {}

  async handleFinish(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { end_date } = req.body;

      const { id: user_id } = req.payload;
      const owner = await this.checkTaskUseCase.checkOwner(id, user_id);
      if (!owner) throw new Error("not the task owner");

      await this.updateTaskUseCase.finish({ id, end_date });

      return res.status(204).send();
    } catch (error) {
      let statusCode = 400;

      if (error.message === "not the task owner") statusCode = 401;

      return res.status(statusCode).json({ message: error.message });
    }
  }

  async handleCancel(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { end_date, cancel_reason } = req.body;

      const { id: user_id } = req.payload;
      const owner = await this.checkTaskUseCase.checkOwner(id, user_id);
      if (!owner) throw new Error("not the task owner");

      await this.updateTaskUseCase.cancel({ id, end_date, cancel_reason });

      return res.status(204).send();
    } catch (error) {
      let statusCode = 400;

      if (error.message === "not the task owner") statusCode = 401;

      return res.status(statusCode).json({ message: error.message });
    }
  }
}
