import { RoleEnum } from "src/domain/enums/user";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { TeamRequestEntity } from "./team.request.entity";
import { TeamMemberEntity } from "./team.member.entity";
import { TaskEntity } from "./task.entity";
import { TaskCommentsEntity } from "./task.comment.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role: RoleEnum;

    @OneToMany(() => TeamRequestEntity, (tr) => tr.user)
    team_requests: TeamRequestEntity[];

    @OneToMany(() => TeamMemberEntity, (tm) => tm.user)
    team_memberships: TeamMemberEntity[];

    @OneToMany(() => TaskEntity, (task) => task.assignee)
    assigned_tasks: TaskEntity[];

    @OneToMany(() => TaskCommentsEntity, (comment) => comment.comment_user)
    comment_user: TaskCommentsEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}