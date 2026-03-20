import { Injectable } from "@nestjs/common";
import { TaskCommentRepository } from "src/infrastructure/repository/task.comment.repo";
import { TaskCommentCreateDto } from "./dto/task.comment.create.dto";
import { UserEntity } from "src/domain/entities/user.entity";

@Injectable()
export class CommentService {
    constructor(
        private readonly taskCommentRepo: TaskCommentRepository
    ) { }

    async createTaskComment(body: TaskCommentCreateDto, user: UserEntity) {
        return await this.taskCommentRepo.createTask(body, user.uuid);
    }

    async getTaskComments(task_uuid: string) {
        return await this.taskCommentRepo.getAllComments(task_uuid);
    }
} 