import { Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { Team } from "../../entities/Team";
import { ITeamsRepository } from "../ITeamsRepository";

@Entity("teams")
export class PostgresTeamEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  manager!: string;
}

export class PostgresTeamsRepository implements ITeamsRepository {
  async create(team: Team): Promise<void> {
    const teams = getRepository(PostgresTeamEntity);
    const new_team = teams.create(team);
    await teams.save(new_team);
  }
}
