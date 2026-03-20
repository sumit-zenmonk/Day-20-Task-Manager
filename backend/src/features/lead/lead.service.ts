import { BadRequestException, Injectable } from "@nestjs/common";
import { TeamRepository } from "src/infrastructure/repository/team.repo";
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamCreateDto } from "./dto/team.create.dto";
import { TeamDeleteDto } from "./dto/team.delete.dto";
import { TeamRequestRepository } from "src/infrastructure/repository/team.request.repo";
import { TeamRequestStatusChangeDto } from "./dto/team.request.change.dto";
import { TeamMemberRepository } from "src/infrastructure/repository/team.member.repo";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { ProjectCreateDto } from "./dto/project.create.dto";
import { ProjectRepository } from "src/infrastructure/repository/project.repo";

@Injectable()
export class LeadService {
    constructor(
        private readonly teamRepo: TeamRepository,
        private readonly teamRequestRepo: TeamRequestRepository,
        private readonly teamMemberRepo: TeamMemberRepository,
        private readonly userRepo: UserRepository,
        private readonly projectRepo: ProjectRepository,
    ) { }

    async CreateTeam(body: TeamCreateDto, user: UserEntity) {
        const isExists = await this.teamRepo.findTeamByName(body.team_name, user.uuid);
        if (isExists) {
            throw new BadRequestException("Active Team with same name");
        }

        const data = await this.teamRepo.createTeam(body, user.uuid);

        return {
            data: { ...data, members: [] },
            message: "Team Created Success"
        };
    }

    async getTeams(user: UserEntity) {
        const isExists = await this.teamRepo.getTeams(user.uuid);

        return {
            data: isExists,
            message: "Team listing Success"
        };
    }

    async deleteTeam(body: TeamDeleteDto, user: UserEntity) {
        const isExists = await this.teamRepo.findTeamByUUID(body.uuid, user.uuid);
        if (!isExists) {
            throw new BadRequestException("No Active Team right now");
        }

        await this.teamRepo.deleteTeam(body.uuid);
        return { message: "Team Deleted Success" };
    }

    async getTeamsRequests(user: UserEntity) {
        return await this.teamRequestRepo.getTeamsRequests(user.uuid);
    }

    async changeJoinRequestStatus(body: TeamRequestStatusChangeDto, user: UserEntity) {
        const request = await this.teamRequestRepo.findOne({ where: { uuid: body.uuid } });
        if (!request) {
            throw new BadRequestException("Request not found");
        }

        const team = await this.teamRepo.findTeamByUUID(request.team_uuid, user.uuid);

        if (!team) {
            throw new BadRequestException("Not authorized");
        }

        if (body.status === true) {
            const exists = await this.teamMemberRepo.findMember(request.user_uuid, request.team_uuid);
            if (exists) {
                throw new BadRequestException("Already a team member");
            }

            await this.teamMemberRepo.createTeamMember(request.user_uuid, request.team_uuid);
        }

        await this.teamRequestRepo.changeJoinRequestStatus(body.uuid);

        return {
            message: "Status changed successfully"
        };
    }

    async CreateProject(body: ProjectCreateDto, user: UserEntity) {
        const isExistsWithSameName = await this.projectRepo.findbyName(body.project_name, body.team_uuid);
        if (isExistsWithSameName) {
            throw new BadRequestException("Project with same name exists");
        }

        const data = await this.projectRepo.createProject(body.project_name, body.project_deadline, body.team_uuid);

        return {
            data,
            message: "Team Project Created Success"
        };
    }


    async getProjects(team_uuid: string, user: UserEntity) {
        return await this.projectRepo.getTeamsProjects(team_uuid);
    }
} 