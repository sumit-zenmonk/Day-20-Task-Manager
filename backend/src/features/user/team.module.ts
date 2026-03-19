import { Module } from "@nestjs/common";
import { UserController } from "./team.controller";
import { TeamRepository } from "src/infrastructure/repository/team.repo";
import { UserService } from "./team.service";
import { TeamRequestRepository } from "src/infrastructure/repository/team.request.repo";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, TeamRequestRepository, TeamRepository],
    exports: [UserModule],
})

export class UserModule { }