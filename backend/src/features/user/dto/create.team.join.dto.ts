import { IsNotEmpty, IsUUID } from 'class-validator';

export class TeamJoinRequestCreateDto {
    @IsUUID()
    @IsNotEmpty()
    team_uuid: string;
}