import { Injectable } from "@nestjs/common";
import { TaskEntity } from "src/domain/entities/task.entity";
import { TaskStatusEnum } from "src/domain/enums/task";
import { RoleEnum } from "src/domain/enums/user";
import { TaskCreateDto } from "src/features/lead/dto/task.create.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TaskEntity, dataSource.createEntityManager());
    }

    async createTask(body: TaskCreateDto) {
        const task = this.create({
            ...body
        });

        return await this.save(task);
    }

    async findTaskBYDetails(task_name: string, project_uuid: string, assigned_to: string) {
        return await this.findOne({
            where: {
                assigned_to,
                task_name,
                project_uuid
            }
        });
    }

    async findTaskBYUUID(task_uuid: string) {
        return await this.findOne({
            where: {
                uuid: task_uuid
            }
        });
    }

    async updateTaskStatus(task_uuid: string, status: TaskStatusEnum) {
        return await this.update(
            {
                uuid: task_uuid
            },
            {
                task_status: status
            }
        );
    }

    async getAllTasks(creator_uuid: string) {
        return await this.find({
            where: {
                project: {
                    team: {
                        creator_id: creator_uuid
                    }
                }
            }
        });
    }

    async getUserAllTasks(user_uuid: string) {
        return await this.find({
            where: {
                assigned_to: user_uuid
            }
        });
    }
} 