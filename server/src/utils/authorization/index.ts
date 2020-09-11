export function splitAuthorization(authorization: string | undefined) {
  if (!authorization) throw new Error("no token provided");
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw new Error("malformed token");

  if (!token) throw new Error("invalid token");

  return { bearer, token };
}
