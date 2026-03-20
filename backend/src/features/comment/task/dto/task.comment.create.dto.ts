import { IsString, IsNotEmpty, MinLength, IsUUID, IsDateString, IsOptional, } from 'class-validator';

export class TaskCommentCreateDto {
    @IsUUID()
    @IsNotEmpty()
    task_uuid: string;

    @IsUUID()
    @IsOptional()
    parent_uuid: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}