import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/role/role.decorator";
import { RoleEnum } from "src/domain/enums/user";
import { RolesGuard } from "src/infrastructure/guard/role/role.guard";
import { UserService } from "./team.service";
import { TeamJoinRequestCreateDto } from "./dto/create.team.join.dto";

@UseGuards(RolesGuard)
@Roles(RoleEnum.USER)
@Controller('/user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get('/team')
    async getTeams(@Req() req: Request) {
        return await this.UserService.getTeams();
    }

    @Get('/teamin')
    async getTeamsIn(@Req() req: Request) {
        return await this.UserService.getTeamsIn(req.user);
    }

    @Post('/team/join')
    async createTeamJoinRequest(@Body() body: TeamJoinRequestCreateDto, @Req() req: Request) {
        return await this.UserService.createTeamJoinRequest(body, req.user);
    }

    @Get('/team/join')
    async getTeamJoinRequest(@Req() req: Request) {
        return await this.UserService.getTeamJoinRequest(req.user);
    }

    @Get('/team/project')
    async getUsersAssignedProjects(@Req() req: Request) {
        return await this.UserService.getUsersAssignedProjects(req.user);
    }
}