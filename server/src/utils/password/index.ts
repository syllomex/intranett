import bcrypt from "bcrypt";

export class Password {
  async hash(password: string): Promise<string | undefined> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      return hash;
    } catch (error) {
      return undefined;
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, hash);
      return result;
    } catch (error) {
      return false;
    }
  }
}
