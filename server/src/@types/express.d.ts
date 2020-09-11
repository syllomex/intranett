import { Payload } from "../useCases/SignIn/SignInUseCase";

declare global {
  namespace Express {
    export interface Request {
      payload: Payload;
    }
  }
}
