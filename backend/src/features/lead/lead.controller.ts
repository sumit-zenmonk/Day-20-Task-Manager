import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { LeadService } from "./lead.service";
import type { Request } from "express";
import { Roles } from "src/infrastructure/guard/role/role.decorator";
import { RoleEnum } from "src/domain/enums/user";
import { RolesGuard } from "src/infrastructure/guard/role/role.guard";
import { TeamCreateDto } from "./dto/team.create.dto";
import { TeamDeleteDto } from "./dto/team.delete.dto";
import { TeamRequestStatusChangeDto } from "./dto/team.request.change.dto";
import { ProjectCreateDto } from "./dto/project.create.dto";

@UseGuards(RolesGuard)
@Roles(RoleEnum.TEAM_LEAD)
@Controller('/lead')
export class LeadController {
    constructor(private readonly leadService: LeadService) { }

    @Post('/team')
    async createTeam(@Body() body: TeamCreateDto, @Req() req: Request) {
        return await this.leadService.CreateTeam(body, req.user);
    }

    @Get('/team')
    async getTeam(@Req() req: Request) {
        return await this.leadService.getTeams(req.user);
    }

    @Delete('/team')
    async deleteTeam(@Body() body: TeamDeleteDto, @Req() req: Request) {
        return await this.leadService.deleteTeam(body, req.user);
    }

    @Get('/team/join')
    async getTeamRequests(@Req() req: Request) {
        return await this.leadService.getTeamsRequests(req.user);
    }

    @Post('/team/join/request')
    async changeJoinRequestStatus(@Body() body: TeamRequestStatusChangeDto, @Req() req: Request) {
        return await this.leadService.changeJoinRequestStatus(body, req.user);
    }

    @Post('/project')
    async createProject(@Body() body: ProjectCreateDto, @Req() req: Request) {
        return await this.leadService.CreateProject(body, req.user);
    }

    @Get('/project')
    async getProjects(@Query('team_uuid') team_uuid: string, @Req() req: Request) {
        return await this.leadService.getProjects(team_uuid, req.user);
    }
}