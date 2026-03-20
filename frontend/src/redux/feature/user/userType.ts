export interface Team {
    uuid: string
    team_name: string
    creator_id: string
}

export interface Member {
    uuid: string
    team_uuid: string
    user_uuid: string
}

export interface Project {
    uuid: string
    project_name: string
    project_deadline: string
    team: {
        team_name: string
        uuid: string
        members: Member[]
    }
    tasks: {
        uuid: string
        task_name: string
        task_status: TaskStatus
        deadline: string
        assigned_to: string
    }[]
}

export interface JoinRequest {
    uuid: string
    team_uuid: string
    user_uuid: string
    is_active: boolean
    created_at: string
}

export type TaskStatus = "pending" | "in_progress" | "completed"

export interface Task {
    uuid: string
    task_name: string
    task_status: TaskStatus
    project_uuid: string
    assigned_to: string
    deadline: string
}

export interface UserState {
    teams: Team[]
    teamsIn: Team[]
    members: Member[]
    projects: Project[]
    tasks: Task[]
    joinRequests: JoinRequest[]

    loading: boolean
    error: string | null
    status: "pending" | "succeed" | "rejected"
}