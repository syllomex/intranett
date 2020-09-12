import { Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { TeamCollaborator } from "../../entities/TeamCollaborator";
import { User } from "../../entities/User";
import { ITeamCollaboratorsRepository } from "../ITeamCollaboratorsRepository";

@Entity("team_collaborators")
export class PostgresTeamCollaboratorsEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  team_id!: string;
}

export class PostgresTeamCollaboratorsRepository
  implements ITeamCollaboratorsRepository {
  async getUsersFromTeam(id: string): Promise<User[]> {
    const repository = getRepository(PostgresTeamCollaboratorsEntity);

    const query = `
    SELECT * FROM team_collaborators
    INNER JOIN users
    ON user_id=users.id
    WHERE team_id = '${id}'
    `;

    const users = await repository.query(query);

    return users;
  }

  async addUserToTeam(collaborator: TeamCollaborator): Promise<void> {
    const repository = getRepository(PostgresTeamCollaboratorsEntity);

    const new_collaborator = repository.create(collaborator);
    await repository.save(new_collaborator);
  }
}
