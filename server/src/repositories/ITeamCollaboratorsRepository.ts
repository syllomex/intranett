import { CollaboratorTask } from "../entities/CollaboratorTask";
import { TeamCollaborator } from "../entities/TeamCollaborator";
import { User } from "../entities/User";

export interface ITeamCollaboratorsRepository {
  addUserToTeam(collaborator: TeamCollaborator): Promise<void>;
  getUsersFromTeam(id: string): Promise<User[]>;
  indexTeamCollaboratorsTasks(id: string): Promise<CollaboratorTask[]>;
}
