import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { RoleEnum } from 'src/domain/enums/user';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(RoleEnum)
    role: RoleEnum.USER;
}