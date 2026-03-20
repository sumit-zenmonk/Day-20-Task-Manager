import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TaskCommentsMigration1773912000006 implements MigrationInterface {
    name = "TaskCommentsMigration1773912000006";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "task_comments",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()", },
                    { name: "parent_uuid", type: "uuid", isNullable: true, },
                    { name: "task_uuid", type: "uuid", },
                    { name: "user_uuid", type: "uuid", },
                    { name: "comment", type: "text", },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );
        await queryRunner.createForeignKey(
            "task_comments",
            new TableForeignKey({
                name: "FK_task_comments_task",
                columnNames: ["task_uuid"],
                referencedTableName: "tasks",
                referencedColumnNames: ["uuid"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "task_comments",
            new TableForeignKey({
                name: "FK_task_comments_user",
                columnNames: ["user_uuid"],
                referencedTableName: "users",
                referencedColumnNames: ["uuid"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "task_comments",
            new TableForeignKey({
                name: "FK_task_comments_parent",
                columnNames: ["parent_uuid"],
                referencedTableName: "task_comments",
                referencedColumnNames: ["uuid"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("task_comments", "FK_task_comments_task");
        await queryRunner.dropForeignKey("task_comments", "FK_task_comments_user");
        await queryRunner.dropForeignKey("task_comments", "FK_task_comments_parent");

        await queryRunner.dropTable("task_comments", true);
    }
}