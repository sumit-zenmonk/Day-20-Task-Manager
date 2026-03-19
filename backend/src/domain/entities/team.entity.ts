import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { TeamMemberEntity } from "./team.member.entity";
import { TeamRequestEntity } from "./team.request.entity";

@Entity('teams')
export class TeamEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    team_name: string;

    @Column({ type: 'uuid' })
    creator_id: string;

    @OneToMany(() => ProjectEntity, (project) => project.team)
    projects: ProjectEntity[];

    @OneToMany(() => TeamMemberEntity, (tm) => tm.team, { eager: true })
    members: TeamMemberEntity[];

    @OneToMany(() => TeamRequestEntity, (tr) => tr.team)
    team_requests: TeamRequestEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}