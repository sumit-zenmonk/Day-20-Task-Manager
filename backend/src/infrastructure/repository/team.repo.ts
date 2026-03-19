import { Injectable } from "@nestjs/common";
import { TeamEntity } from "src/domain/entities/team.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { TeamCreateDto } from "src/features/lead/dto/team.create.dto";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TeamRepository extends Repository<TeamEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TeamEntity, dataSource.createEntityManager());
    }

    async createTeam(body: TeamCreateDto, creator_id: string) {
        const team = await this.create({
            ...body, creator_id: creator_id
        });
        return await this.save(team);
    }

    async findTeamByName(team_name: string, creator_id: string) {
        return await this.findOne({
            where: {
                creator_id: creator_id,
                team_name: team_name
            }
        });
    }

    async findTeamByUUID(team_uuid: string, creator_id: string) {
        return await this.findOne({
            where: {
                uuid: team_uuid,
                creator_id: creator_id,
            }
        });
    }

    async getTeams(creator_id: string) {
        return await this.find({
            where: {
                creator_id: creator_id
            }
        });
    }

    async deleteTeam(uuid: string) {
        return await this.softDelete(uuid);
    }

    async getAllTeams() {
        return await this.find({});
    }

    async userTeamIn(user_uuid: string) {
        return await this.find({
            where: {
                members: {
                    user_uuid: user_uuid
                }
            },
            relations: {
                members: true
            }
        });
    }
}