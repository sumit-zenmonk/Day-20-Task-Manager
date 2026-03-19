import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatusEnum } from "../enums/task";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "./user.entity";

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    task_name: string;

    @Column({
        type: 'enum',
        enum: TaskStatusEnum,
        default: TaskStatusEnum.PENDING,
    })
    task_status: TaskStatusEnum;

    @Column({ type: 'uuid' })
    project_uuid: string;

    @Column({ type: 'uuid' })
    assigned_to: string;

    @Column({ type: 'timestamp' })
    deadline: Date;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    @JoinColumn({ name: 'project_uuid' })
    project: ProjectEntity;

    @ManyToOne(() => UserEntity, (user) => user.assigned_tasks)
    @JoinColumn({ name: 'assigned_to' })
    assignee: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}