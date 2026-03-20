import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import { CommentService } from "./comment.service";
import { TaskCommentCreateDto } from "./dto/task.comment.create.dto";

@Controller('/comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post('/task')
    async createTaskComment(@Body() body: TaskCommentCreateDto, @Req() req: Request) {
        return await this.commentService.createTaskComment(body, req.user);
    }

    @Get('/task')
    async getTaskComments(@Query('task_uuid') task_uuid: string) {
        return await this.commentService.getTaskComments(task_uuid);
    }
}