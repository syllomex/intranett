import { Password } from ".";

describe("test password functions", () => {
  it("should return a hash string", async () => {
    const password = new Password();
    const hash = await password.hash("12345678");

    expect(hash).toBeDefined();
  });

  it("should compare password to hash and return true", async () => {
    const pass = "12345678";
    const hash = "$2b$10$1lzUJF7IQln53DcfsiHbd.c/Qr5E998cpNHhRqtuoOX.jqHIK9qg2";

    const password = new Password();
    const result = await password.compare(pass, hash);

    expect(result).toBe(true);
  });
});
