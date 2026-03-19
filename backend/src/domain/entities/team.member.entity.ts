import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

@Entity('team_members')
export class TeamMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    team_uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @ManyToOne(() => UserEntity, (user) => user.team_memberships)
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @ManyToOne(() => TeamEntity, (team) => team.members)
    @JoinColumn({ name: 'team_uuid' })
    team: TeamEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}