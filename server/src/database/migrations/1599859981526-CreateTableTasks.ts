import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableTasks1599859981526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "start_date",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "status",
            type: "integer",
            isNullable: false,
          },
          {
            name: "cancel_reason",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks", undefined, true);
  }
}
