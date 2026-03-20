import { IsNotEmpty, IsUUID, IsEnum, } from 'class-validator';
import { TaskStatusEnum } from 'src/domain/enums/task';

export class TaskUpdateStatusDto {
    @IsUUID()
    @IsNotEmpty()
    task_uuid: string;

    @IsEnum(TaskStatusEnum)
    @IsNotEmpty()
    status: TaskStatusEnum.IN_PROGRESS
}