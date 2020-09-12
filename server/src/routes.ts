import { Router } from "express";

/** MIDDLEWARES */
import { isLogged } from "./middlewares/isLogged";
import { isManager } from "./middlewares/isManager";

/** CONTROLLERS */
// User and Auth
import { createUserController } from "./useCases/CreateUser";
import { signInController } from "./useCases/SignIn";

// Task
import { createTaskController } from "./useCases/CreateTask";
import { indexTaskController } from "./useCases/IndexTask";
import { updateTaskController } from "./useCases/UpdateTask";

// Team
import { createTeamController } from "./useCases/CreateTeam";
import { addCollaboratorToTeamController } from "./useCases/AddCollaboratorToTeam";
import { getTeamCollaboratorsController } from "./useCases/GetTeamCollaborators";
import { indexTeamCollaboratorsTasksController } from "./useCases/IndexCollaboratorsTasks";
import { indexTeamsByManagerController } from "./useCases/IndexTeamsByManager";

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
  return indexTaskController.handle(req, res);
});

router.post("/tasks", isLogged, (req, res) => {
  return createTaskController.handle(req, res);
});

router.put("/tasks/:id/finish", isLogged, (req, res) => {
  return updateTaskController.handleFinish(req, res);
});

router.put("/tasks/:id/cancel", isLogged, (req, res) => {
  return updateTaskController.handleCancel(req, res);
});

/** TEAMS ROUTES */
router.post("/teams", isManager, (req, res) => {
  return createTeamController.handle(req, res);
});

router.get("/teams", isManager, (req, res) => {
  return indexTeamsByManagerController.handle(req, res);
});

router.post("/teams/:team_id/collaborators", isManager, (req, res) => {
  return addCollaboratorToTeamController.handle(req, res);
});

router.get("/teams/:team_id/collaborators", isManager, (req, res) => {
  return getTeamCollaboratorsController.handle(req, res);
});

router.get("/teams/tasks", isManager, (req, res) => {
  return indexTeamCollaboratorsTasksController.handle(req, res);
});

export { router };
