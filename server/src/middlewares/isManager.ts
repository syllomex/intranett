import { NextFunction, Request, Response } from "express";
import { Auth } from "../services/auth";
import { Payload } from "../useCases/SignIn/SignInUseCase";
import { splitAuthorization } from "../utils/authorization";

const auth = new Auth();

export function isManager(req: Request, res: Response, next: NextFunction) {
  try {
    const token = splitAuthorization(req.headers.authorization);

    const payload: Payload | undefined = auth.getPayload(token);

    if (!payload) throw new Error("invalid token");
    if (!payload.manager)
      return res.status(401).json({ message: "unauthorized" });

    req.payload = payload;

    next();
  } catch (error) {
    let statusCode = 400;

    if (
      error.message === "invalid token" ||
      error.message === "malformed token"
    )
      statusCode = 401;

    return res.status(statusCode).json({ message: error.message });
  }
}
