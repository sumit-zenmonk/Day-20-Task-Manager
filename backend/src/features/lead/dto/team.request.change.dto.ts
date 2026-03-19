import { IsString, IsEmail, IsNotEmpty, MinLength, IsUUID, IsBoolean } from 'class-validator';

export class TeamRequestStatusChangeDto {
    @IsUUID()
    @IsNotEmpty()
    uuid: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean
}