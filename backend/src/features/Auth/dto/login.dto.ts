import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { RoleEnum } from 'src/domain/enums/user';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    // @IsEnum(Role)
    // role: Role.USER;
}