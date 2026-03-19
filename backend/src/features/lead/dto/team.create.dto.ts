import { IsString, IsEmail, IsNotEmpty, MinLength, IsUUID } from 'class-validator';

export class TeamCreateDto {
    @IsString()
    @MinLength(8)
    team_name: string;
}