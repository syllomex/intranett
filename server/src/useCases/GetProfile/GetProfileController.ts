import { Request, Response } from "express";
import { GetProfileUseCase } from "./GetProfileUseCase";

export class GetProfileController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.payload;

      const profile = await this.getProfileUseCase.execute({ id });

      return res.json(profile);
    } catch (error) {
      let code = 400;
      return res.status(code).json({ message: error.message });
    }
  }
}
