import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TasksMigration1773912000005 implements MigrationInterface {
    name = "TasksMigration1773912000005";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."tasks_task_status_enum" AS ENUM('pending', 'in_progress', 'completed')`
        );

        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "task_name", type: "varchar" },
                    { name: "task_status", type: "tasks_task_status_enum", default: `'pending'` },
                    { name: "project_uuid", type: "uuid" },
                    { name: "assigned_to", type: "uuid" },
                    { name: "deadline", type: "timestamp" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                name: "FK_tasks_project",
                columnNames: ["project_uuid"],
                referencedTableName: "projects",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                name: "FK_tasks_user",
                columnNames: ["assigned_to"],
                referencedTableName: "users",
                referencedColumnNames: ["uuid"],
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tasks", "FK_tasks_project");
        await queryRunner.dropForeignKey("tasks", "FK_tasks_user");
        await queryRunner.dropTable("tasks", true);

        await queryRunner.query(
            `DROP TYPE IF EXISTS "public"."tasks_task_status_enum"`
        );
    }
}