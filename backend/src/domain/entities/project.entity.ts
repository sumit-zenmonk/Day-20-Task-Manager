import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TeamEntity } from "./team.entity";
import { TaskEntity } from "./task.entity";

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    project_name: string;

    @Column({ type: 'timestamp' })
    project_deadline: Date;

    @Column({ type: 'uuid' })
    team_uuid: string;

    @ManyToOne(() => TeamEntity, (team) => team.projects)
    @JoinColumn({ name: 'team_uuid' })
    team: TeamEntity;

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}