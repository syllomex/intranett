import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import { signInController } from "./useCases/SignIn";

const router = Router();

router.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

router.post("/auth", (req, res) => {
  return signInController.handle(req, res);
});

export { router };
