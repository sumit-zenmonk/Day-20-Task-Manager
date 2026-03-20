import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamRepository } from "src/infrastructure/repository/team.repo";
import { TeamJoinRequestCreateDto } from "./dto/create.team.join.dto";
import { TeamRequestRepository } from "src/infrastructure/repository/team.request.repo";
import { ProjectRepository } from "src/infrastructure/repository/project.repo";
import { TaskUpdateStatusDto } from "./dto/task.update.dto";
import { TaskRepository } from "src/infrastructure/repository/task.repo";
import { TaskStatusEnum } from "src/domain/enums/task";

@Injectable()
export class UserService {
    constructor(
        private readonly teamRepo: TeamRepository,
        private readonly teamRequestRepo: TeamRequestRepository,
        private readonly projectRepo: ProjectRepository,
        private readonly taskRepo: TaskRepository
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

    async getUsersAssignedProjects(user: UserEntity) {
        const UsersActiveTeams = await this.projectRepo.getUsersAssignedProjects(user.uuid);

        return {
            data: UsersActiveTeams,
            message: "User's Project listing Success"
        };
    }

    async getUserAllTasks(user: UserEntity) {
        const UsersActiveTeams = await this.taskRepo.getUserAllTasks(user.uuid);

        return {
            data: UsersActiveTeams,
            message: "User's Project Task listing Success"
        };
    }

    async updateTaskStatus(body: TaskUpdateStatusDto, user: UserEntity) {
        const isExists = await this.taskRepo.findTaskBYUUID(body.task_uuid);
        if (!isExists) {
            throw new BadRequestException("Task not found");
        }
        if (body.status == TaskStatusEnum.COMPLETED) {
            throw new BadRequestException("Only Team Lead can make task complete");
        }
        await this.taskRepo.updateTaskStatus(body.task_uuid, body.status);
        return {
            message: "Project Task status updated Success"
        };
    }
} 