import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { TaskCommentRepository } from "src/infrastructure/repository/task.comment.repo";

@Module({
    imports: [],
    controllers: [CommentController],
    providers: [CommentService, TaskCommentRepository],
    exports: [CommentModule],
})

export class CommentModule { }