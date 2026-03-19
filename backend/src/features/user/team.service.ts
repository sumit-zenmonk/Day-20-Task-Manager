import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamRepository } from "src/infrastructure/repository/team.repo";
import { TeamJoinRequestCreateDto } from "./dto/create.team.join.dto";
import { TeamRequestRepository } from "src/infrastructure/repository/team.request.repo";

@Injectable()
export class UserService {
    constructor(
        private readonly teamRepo: TeamRepository,
        private readonly teamRequestRepo: TeamRequestRepository,

    ) { }

    async getTeams() {
        const allActiveTeams = await this.teamRepo.getAllTeams();
        return {
            data: allActiveTeams,
            message: "Team listing Success"
        };
    }

    async createTeamJoinRequest(body: TeamJoinRequestCreateDto, user: UserEntity) {
        const isExists = await this.teamRequestRepo.checkActiveRequest(body, user.uuid);
        if (isExists) {
            throw new BadRequestException("Active Team Request Already with same name");
        }
        const data = await this.teamRequestRepo.createTeamRequest(body, user.uuid);

        return {
            data: data,
            message: "Team Join Request Created Success"
        };
    }

    async getTeamJoinRequest(user: UserEntity) {
        const allActiveTeamsRequest = await this.teamRequestRepo.getAllTeamsRequest(user.uuid);
        return {
            data: allActiveTeamsRequest,
            message: "Team Join Request listing Success"
        };
    }

    async getTeamsIn(user: UserEntity) {
        const UsersActiveTeams = await this.teamRepo.userTeamIn(user.uuid);

        return {
            data: UsersActiveTeams,
            message: "User's Team listing Success"
        };
    }
} 