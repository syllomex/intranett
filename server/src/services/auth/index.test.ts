import { Auth } from ".";

const auth = new Auth();

const RANDOM_ID = `6010bdfb-6900-48e8-bdca-1c5fba649de8`;
const JWT_DEFAULT_STRING = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`;
const VALID_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTBiZGZiLTY5MDAtNDhlOC1iZGNhLTFjNWZiYTY0OWRlOCIsImlhdCI6MTU5OTgyNTE1NCwiZXhwIjoxNTk5OTExNTU0fQ.5IgDqOLi_uaTXUo4r3zXtgza08OOhevAhji9DgICKTA`;
const INVALID_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTBiZGZiLTY5MDAtNDhlOC1iZLNhLTFjNWZiYTY0OWRlOCIsImlhdCI6MTU5OTgyNTE1NCwiZXhwIjoxNTk5OTExNTU0fQ.5IgDqOLi_uaTXUo4r3zXtgza08OOhevAhji9DgICKTA`;

describe("test jwt auth functions", () => {
  it("should return an access token string starting with jwt default string", () => {
    const token = auth.sign(RANDOM_ID);
    const matches = token.startsWith(JWT_DEFAULT_STRING);

    expect(matches).toBe(true);
  });

  it("should return a payload object", () => {
    const payload = auth.getPayload(VALID_TOKEN);

    expect(payload).toHaveProperty("id");
    expect(payload).toHaveProperty("exp");
    expect(payload).toHaveProperty("iat");
  });

  it("should return undefined", () => {
    const payload = auth.getPayload(INVALID_TOKEN);
    expect(payload).toBeUndefined();
  });
});
