import { Module } from "@nestjs/common";
import { LeadService } from "./lead.service";
import { LeadController } from "./lead.controller";
import { TeamRepository } from "src/infrastructure/repository/team.repo";
import { TeamRequestRepository } from "src/infrastructure/repository/team.request.repo";
import { TeamMemberRepository } from "src/infrastructure/repository/team.member.repo";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { ProjectRepository } from "src/infrastructure/repository/project.repo";

@Module({
    imports: [],
    controllers: [LeadController],
    providers: [LeadService, TeamRepository, TeamRequestRepository, TeamMemberRepository, UserRepository, ProjectRepository],
    exports: [LeadModule],
})

export class LeadModule { }