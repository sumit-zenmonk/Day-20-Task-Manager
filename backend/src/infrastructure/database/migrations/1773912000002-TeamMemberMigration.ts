import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TeamMembersMigration1773912000002 implements MigrationInterface {
    name = "TeamMembersMigration1773912000002";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "team_members",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()", },
                    { name: "team_uuid", type: "uuid", isNullable: false, },
                    { name: "user_uuid", type: "uuid", isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "team_members",
            new TableForeignKey({
                name: "FK_team_members_team",
                columnNames: ["team_uuid"],
                referencedTableName: "teams",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );

        await queryRunner.createForeignKey(
            "team_members",
            new TableForeignKey({
                name: "FK_team_members_user",
                columnNames: ["user_uuid"],
                referencedTableName: "users",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("team_members", "FK_team_members_team");
        await queryRunner.dropForeignKey("team_members", "FK_team_members_user");
        await queryRunner.dropTable("team_members", true);
    }
}