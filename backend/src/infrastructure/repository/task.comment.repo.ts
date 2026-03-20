import { Injectable } from "@nestjs/common";
import { TaskCommentsEntity } from "src/domain/entities/task.comment.entity";
import { TaskCommentCreateDto } from "src/features/comment/task/dto/task.comment.create.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TaskCommentRepository extends Repository<TaskCommentsEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TaskCommentsEntity, dataSource.createEntityManager());
    }

    async createTask(body: TaskCommentCreateDto, user_uuid: string) {
        const task = await this.create({
            ...body,
            user_uuid: user_uuid
        });

        return await this.save(task);
    }
    async getAllComments(task_uuid: string) {
        return await this.find({
            where: {
                task_uuid: task_uuid
            }
            , relations: {
                comment_user: true
            }
            , select: {
                uuid: true,
                parent_uuid: true,
                comment: true,
                task_uuid: true,
                comment_user: {
                    uuid: true,
                    username: true,
                    email: true,
                },
                created_at: true
            }
        })
    }
}