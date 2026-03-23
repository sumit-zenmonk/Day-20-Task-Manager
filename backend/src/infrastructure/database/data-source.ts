//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamEntity } from "src/domain/entities/team.entity";
import { TeamMemberEntity } from "src/domain/entities/team.member.entity";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { TaskEntity } from "src/domain/entities/task.entity";
import { TeamRequestEntity } from "src/domain/entities/team.request.entity";
import { TaskCommentsEntity } from "src/domain/entities/task.comment.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [UserEntity, TeamEntity, TeamMemberEntity, ProjectEntity, TaskEntity, TeamRequestEntity, TaskCommentsEntity],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource };