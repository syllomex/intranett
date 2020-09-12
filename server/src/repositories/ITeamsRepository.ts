import { Team } from "../entities/Team";

export interface ITeamsRepository {
  create(team: Team): Promise<void>;
  findByManager(manager_id: string): Promise<Team[]>;
  checkOwner(team_id: string, manager_id: string): Promise<boolean>;
}
