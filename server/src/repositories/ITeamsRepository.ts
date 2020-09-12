import { Team } from "../entities/Team";

export interface ITeamsRepository {
  create(team: Team): Promise<void>;
}
