import { Injectable } from "@nestjs/common";
import { TaskEntity } from "src/domain/entities/task.entity";
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

    async findTask(task_name: string, project_uuid: string, assigned_to: string) {
        return await this.findOne({
            where: {
                assigned_to,
                task_name,
                project_uuid
            }
        });
    }
} 