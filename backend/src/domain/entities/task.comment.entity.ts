import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";

@Entity('task_comments')
export class TaskCommentsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    parent_uuid: string;

    @Column({ type: 'uuid' })
    task_uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @Column()
    comment: string;

    @ManyToOne(() => TaskEntity, (t) => t.comments)
    @JoinColumn({ name: 'task_uuid' })
    task: TaskEntity;

    @ManyToOne(() => UserEntity, (user) => user.comment_user)
    @JoinColumn({ name: 'user_uuid' })
    comment_user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}