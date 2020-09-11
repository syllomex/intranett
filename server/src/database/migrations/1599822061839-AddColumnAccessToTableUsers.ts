import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnAccessToTableUsers1599822061839
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "access",
        type: "integer",
        isNullable: false,
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "access");
  }
}
