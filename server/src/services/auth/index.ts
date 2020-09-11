import jwt from "jsonwebtoken";
import { Payload } from "../../useCases/SignIn/SignInUseCase";

const JWT_SECRET = "provisory_secret";

export class Auth {
  sign(id: string): string {
    const payload = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });

    return payload;
  }

  getPayload(token: string): Payload | undefined {
    const tmp_payload: any = jwt.verify(token, JWT_SECRET);

    if (!tmp_payload.id || !tmp_payload.exp || !tmp_payload.iat)
      throw new Error("invalid payload");

    const payload: Payload = {
      id: tmp_payload.id,
      exp: tmp_payload.exp,
      iat: tmp_payload.iat,
    };

    return payload;
  }
}
