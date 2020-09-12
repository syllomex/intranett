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

  async findByManager(id: string): Promise<Team[]> {
    const repository = getRepository(PostgresTeamEntity);
    const teams = await repository.find({ where: { manager: id } });
    return teams;
  }

  async checkOwner(team_id: string, manager_id: string): Promise<boolean> {
    const repository = getRepository(PostgresTeamEntity);
    const team = await repository.findOne({ where: { id: team_id } });

    if (team?.manager === manager_id) return true;

    return false;
  }
}
