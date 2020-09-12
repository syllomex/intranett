import { Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { CollaboratorTask } from "../../entities/CollaboratorTask";
import { Task } from "../../entities/Task";
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
    SELECT C.id, U.name, U.email 
    FROM team_collaborators C
    INNER JOIN users U
    ON C.user_id = U.id
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

  async indexTeamCollaboratorsTasks(id: string): Promise<CollaboratorTask[]> {
    const repository = getRepository(PostgresTeamCollaboratorsEntity);

    const query = `
    SELECT T.*, U.name as user_name, U.email
    FROM team_collaborators C
    INNER JOIN users U
    ON C.user_id = U.id
    INNER JOIN tasks T
    ON U.id = T.user_id
    WHERE team_id = '${id}'
    `;

    const tasks = await repository.query(query);

    return tasks;
  }
}
