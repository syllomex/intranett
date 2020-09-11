import { Payload } from "../useCases/SignIn/SignInUseCase";

declare global {
  declare namespace Express {
    export interface Request {
      payload: Payload;
    }
  }
}
