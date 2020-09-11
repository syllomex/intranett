import { splitAuthorization } from ".";
import { Auth } from "../../services/auth";

describe("test authorization", () => {
  it("should return an access token", () => {
    const auth = new Auth();

    const valid_token = auth.sign("random_id");
    const valid_authorization = `Bearer ${valid_token}`;

    const token = splitAuthorization(valid_authorization);

    expect(token).toBe(valid_token);
  });

  it("should throw errors", () => {
    expect(() => splitAuthorization("")).toThrow("no token provided");
    expect(() => splitAuthorization("aaa aaa")).toThrow("malformed token");
    expect(() => splitAuthorization("Bearer ")).toThrow("invalid token");
  });
});
