import { Injectable } from "@nestjs/common";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { TeamCreateDto } from "src/features/lead/dto/team.create.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(ProjectEntity, dataSource.createEntityManager());
    }

    async createProject(project_name: string, project_deadline: string, team_uuid: string) {
        const member = this.create({
            project_name,
            project_deadline,
            team_uuid,
        });

        return await this.save(member);
    }

    async findbyName(project_name: string, team_uuid: string) {
        return await this.findOne({
            where: { project_name, team_uuid }
        });
    }

    async getTeamsProjects(team_uuid: string) {
        return await this.find({
            where: {
                team_uuid: team_uuid,
            }
            , relations: {
                tasks: true,
                team: true
            }
        });
    }

    async getUsersAssignedProjects(user_uuid: string) {
        return await this.find({
            where: {
                team: {
                    members: {
                        user_uuid
                    }
                }
            },
            select: {
                uuid: true,
                project_name: true,
                project_deadline: true,
                team: {
                    uuid: true,
                    team_name: true,
                },
                tasks: {
                    uuid: true,
                    task_name: true,
                    task_status: true,
                    deadline: true,
                    assigned_to: true,
                }
            },
            relations: {
                tasks: true,
                team: true
            }
        });
    }
} 