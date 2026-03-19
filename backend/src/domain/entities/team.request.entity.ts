import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

@Entity('team_request')
export class TeamRequestEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    team_uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @ManyToOne(() => UserEntity, (user) => user.team_requests)
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @ManyToOne(() => TeamEntity, (team) => team.team_requests)
    @JoinColumn({ name: 'team_uuid' })
    team: TeamEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}