import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TeamsMigration1773912000001 implements MigrationInterface {
    name = "TeamsMigration1773912000001";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teams",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()", },
                    { name: "team_name", type: "varchar", isNullable: false, },
                    { name: "creator_id", type: "uuid", isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "teams",
            new TableForeignKey({
                columnNames: ["creator_id"],
                referencedTableName: "users",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
                name: "FK_teams_creator_user",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("teams", "FK_teams_creator_user");
        await queryRunner.dropTable("teams", true);
    }
}