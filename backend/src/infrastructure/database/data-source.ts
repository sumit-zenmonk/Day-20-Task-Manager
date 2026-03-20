//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";

//Entities
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamEntity } from "src/domain/entities/team.entity";
import { TeamMemberEntity } from "src/domain/entities/team.member.entity";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { TaskEntity } from "src/domain/entities/task.entity";
import { TeamRequestEntity } from "src/domain/entities/team.request.entity";
import { TaskCommentsEntity } from "src/domain/entities/task.comment.entity";

const options: DataSourceOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432, //5433
    username: "postgres",
    password: "123", //sumit123
    database: "taskmanager",
    entities: [UserEntity, TeamEntity, TeamMemberEntity, ProjectEntity, TaskEntity, TeamRequestEntity, TaskCommentsEntity],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export { dataSource };