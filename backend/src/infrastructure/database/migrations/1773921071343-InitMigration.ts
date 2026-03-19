import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1773921071343 implements MigrationInterface {
    name = 'InitMigration1773921071343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_tasks_project"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_tasks_user"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_projects_team"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "FK_team_members_team"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "FK_team_members_user"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_teams_creator_user"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_452dee804a597dd9a9ed6db5f1e" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_5770b28d72ca90c43b1381bf787" FOREIGN KEY ("assigned_to") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_779344dde504d8925bd7139d508" FOREIGN KEY ("team_uuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_members" ADD CONSTRAINT "FK_03822ef2b4856806f98a448a127" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_members" ADD CONSTRAINT "FK_b09d6d520cea2b7c866ba1493ea" FOREIGN KEY ("team_uuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_request" ADD CONSTRAINT "FK_4ab414f58e3cd6f3a748e21e1e0" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_request" ADD CONSTRAINT "FK_a9b6a1b96df1296bf403df586e3" FOREIGN KEY ("team_uuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_request" DROP CONSTRAINT "FK_a9b6a1b96df1296bf403df586e3"`);
        await queryRunner.query(`ALTER TABLE "team_request" DROP CONSTRAINT "FK_4ab414f58e3cd6f3a748e21e1e0"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "FK_b09d6d520cea2b7c866ba1493ea"`);
        await queryRunner.query(`ALTER TABLE "team_members" DROP CONSTRAINT "FK_03822ef2b4856806f98a448a127"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_779344dde504d8925bd7139d508"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_5770b28d72ca90c43b1381bf787"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_452dee804a597dd9a9ed6db5f1e"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_teams_creator_user" FOREIGN KEY ("creator_id") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_members" ADD CONSTRAINT "FK_team_members_user" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_members" ADD CONSTRAINT "FK_team_members_team" FOREIGN KEY ("team_uuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_projects_team" FOREIGN KEY ("team_uuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_tasks_user" FOREIGN KEY ("assigned_to") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_tasks_project" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
