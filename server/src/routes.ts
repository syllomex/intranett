import { Router } from "express";
import { isLogged } from "./middlewares/isLogged";
import { createUserController } from "./useCases/CreateUser";
import { signInController } from "./useCases/SignIn";

const router = Router();

router.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

router.post("/auth", (req, res) => {
  return signInController.handle(req, res);
});

router.get("/test", isLogged, (req, res) => {
  res.send(req.payload);
});

export { router };
