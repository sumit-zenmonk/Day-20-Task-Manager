import { Injectable } from "@nestjs/common";
import { TeamMemberEntity } from "src/domain/entities/team.member.entity";
import { TeamCreateDto } from "src/features/lead/dto/team.create.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TeamMemberRepository extends Repository<TeamMemberEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TeamMemberEntity, dataSource.createEntityManager());
    }

    async createTeamMember(user_uuid: string, team_uuid: string) {
        const member = this.create({
            user_uuid,
            team_uuid,
        });

        return await this.save(member);
    }

    async findMember(user_uuid: string, team_uuid: string) {
        return await this.findOne({
            where: { user_uuid, team_uuid }
        });
    }

    async findTeamMembers(team_uuid: string) {
        return await this.find({
            where: { team_uuid },
            relations: { user: true },
            select: {
                uuid: true,
                team_uuid: true,
                user: {
                    uuid: true,
                    username: true,
                    email: true,
                    role: true,
                },
                created_at: true,
            }
        });
    }
} 