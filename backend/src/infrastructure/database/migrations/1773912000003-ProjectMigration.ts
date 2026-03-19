import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProjectsMigration1773912000003 implements MigrationInterface {
    name = "ProjectsMigration1773912000003";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()", },
                    { name: "project_name", type: "varchar", isNullable: false, },
                    { name: "project_deadline", type: "timestamp", isNullable: false, },
                    { name: "team_uuid", type: "uuid", isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "projects",
            new TableForeignKey({
                name: "FK_projects_team",
                columnNames: ["team_uuid"],
                referencedTableName: "teams",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("projects", "FK_projects_team");
        await queryRunner.dropTable("projects", true);
    }
}