import { IsString, IsNotEmpty, MinLength, IsUUID, IsEnum, IsOptional, IsDateString, } from 'class-validator';

export class TaskCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    task_name: string;

    @IsUUID()
    @IsNotEmpty()
    project_uuid: string;

    @IsUUID()
    @IsNotEmpty()
    assigned_to: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: string;
}