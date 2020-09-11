import { NextFunction, Request, Response } from "express";
import { Auth } from "../services/auth";
import { Payload } from "../useCases/SignIn/SignInUseCase";
import { splitAuthorization } from "../utils/authorization";

const auth = new Auth();

export function isLogged(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = splitAuthorization(req.headers.authorization);

    const payload: Payload | undefined = auth.getPayload(token);

    if (!payload) throw new Error("can't get token payload");

    req.payload = payload;

    next();
  } catch (error) {
    let statusCode = 400;
    return res.send(statusCode).json({ message: error.message });
  }
}
