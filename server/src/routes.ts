import { Router } from "express";
import { isLogged } from "./middlewares/isLogged";
import { addCollaboratorToTeamController } from "./useCases/AddCollaboratorToTeam";
import { createTaskController } from "./useCases/CreateTask";
import { createTeamController } from "./useCases/CreateTeam";
import { createUserController } from "./useCases/CreateUser";
import { getTeamCollaboratorsController } from "./useCases/GetTeamCollaborators";
import { indexTaskController } from "./useCases/IndexTask";
import { signInController } from "./useCases/SignIn";
import { updateTaskController } from "./useCases/UpdateTask";

const router = Router();

/** USER AND AUTH ROUTES */
router.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

router.post("/auth", (req, res) => {
  return signInController.handle(req, res);
});

/** TASKS ROUTES */
router.get("/tasks", isLogged, (req, res) => {
  return indexTaskController.handleIndexByUser(req, res);
});

router.post("/tasks", isLogged, (req, res) => {
  return createTaskController.handle(req, res);
});

router.put("/tasks/finish/:id", isLogged, (req, res) => {
  return updateTaskController.handleFinish(req, res);
});

router.put("/tasks/cancel/:id", isLogged, (req, res) => {
  return updateTaskController.handleCancel(req, res);
});

/** TEAMS ROUTES */
router.post("/teams", isLogged, (req, res) => {
  return createTeamController.handle(req, res);
});

router.post("/teams/collaborators", isLogged, (req, res) => {
  return addCollaboratorToTeamController.handle(req, res);
});

router.get("/teams/collaborators/:id", isLogged, (req, res) => {
  return getTeamCollaboratorsController.handle(req, res);
});

export { router };
