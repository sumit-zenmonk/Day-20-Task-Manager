import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { RoleEnum } from "src/domain/enums/user";
import { RegisterDto } from "src/features/Auth/dto/register.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async register(body: RegisterDto) {
        const user = this.create(body);
        return await this.save(user);
    }

    async findByUuid(uuid: string) {
        const user = await this.find({
            where: {
                uuid: uuid
            },
            select: {
                email: true,
                username: true,
                uuid: true,
                role: true
            }
        });
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.find({
            where: {
                email: email
            },
            select: {
                email: true,
                username: true,
                uuid: true,
                password: true,
                role: true
            }
        });
        return user;
    }

    async findByEmailAndRole(email: string, role: RoleEnum) {
        const user = await this.find({
            where: {
                email: email,
                role: role
            },
            select: {
                email: true,
                username: true,
                uuid: true,
                password: true,
                role: true
            }
        });
        return user;
    }
}