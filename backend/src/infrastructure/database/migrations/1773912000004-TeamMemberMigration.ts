import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TeamRequestsMigration1773912000004 implements MigrationInterface {
    name = "TeamRequestsMigration1773912000004";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "team_request",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()", },
                    { name: "team_uuid", type: "uuid" },
                    { name: "user_uuid", type: "uuid" },
                    { name: "is_active", type: "boolean", default: "true", },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("team_requests");
    }
}