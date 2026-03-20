import { IsString, IsNotEmpty, MinLength, IsUUID, IsDateString, } from 'class-validator';

export class ProjectCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    project_name: string;

    @IsDateString()
    @IsNotEmpty()
    project_deadline: string;

    @IsUUID()
    @IsNotEmpty()
    team_uuid: string;
}