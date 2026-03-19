import { IsString, IsEmail, IsNotEmpty, MinLength, IsUUID, isNotEmpty } from 'class-validator';

export class TeamDeleteDto {
    @IsUUID()
    @IsNotEmpty()
    uuid: string;
}