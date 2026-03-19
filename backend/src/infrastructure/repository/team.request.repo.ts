import { Injectable } from "@nestjs/common";
import { TeamRequestEntity } from "src/domain/entities/team.request.entity";
import { TeamRequestStatusChangeDto } from "src/features/lead/dto/team.request.change.dto";
import { TeamJoinRequestCreateDto } from "src/features/user/dto/create.team.join.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TeamRequestRepository extends Repository<TeamRequestEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TeamRequestEntity, dataSource.createEntityManager());
    }

    async createTeamRequest(body: TeamJoinRequestCreateDto, joiner_id: string) {
        const team = await this.create({
            ...body, user_uuid: joiner_id
        });
        return await this.save(team);
    }

    async checkActiveRequest(body: TeamJoinRequestCreateDto, joiner_id: string) {
        return await this.findOne({
            where: {
                user_uuid: joiner_id,
                team_uuid: body.team_uuid,
                is_active: true
            }
        })
    }

    async getAllTeamsRequest(joiner_id: string) {
        return await this.find({
            where: {
                user_uuid: joiner_id,
                is_active: true
            }
        })
    }

    async getTeamsRequests(creator_id: string) {
        return await this.find({
            where: {
                is_active: true,
                team: {
                    creator_id: creator_id,
                }
            }, relations: {
                team: true,
                user: true
            },
            select: {
                user: {
                    username: true,
                    email: true,
                    role: true
                }
            }
        })
    }

    async changeJoinRequestStatus(body: TeamRequestStatusChangeDto) {
        return await this.update(
            {
                uuid: body.uuid,
            },
            {
                is_active: body.status
            }
        )
    }
} 