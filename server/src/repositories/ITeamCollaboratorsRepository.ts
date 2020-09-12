import { CollaboratorTask } from "../entities/CollaboratorTask";
import { TeamCollaborator } from "../entities/TeamCollaborator";
import { User } from "../entities/User";

export interface ITeamCollaboratorsRepository {
  addUserToTeam(collaborator: TeamCollaborator): Promise<void>;
  getUsersFromTeam(id: string): Promise<User[]>;
  indexTeamCollaboratorsTasks(manager_id: string): Promise<CollaboratorTask[]>;
  checkUserAlreadyInTeam(team_id: string, user_id: string): Promise<boolean>;
}
