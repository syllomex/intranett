import { createConnection } from "typeorm";

export default createConnection()
  .then(() => console.log("connected to postgres"))
  .catch((err) => console.log("error on postgres connection", err.message));
