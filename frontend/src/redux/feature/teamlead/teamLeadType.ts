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
    team_uuid: string
}

export interface JoinRequests {
    uuid: string
    team_uuid: string
    user_uuid: string
    is_active: boolean
    user: {
        username: string
        email: string
        role: string
    }
    team?: {
        team_name: string
    }
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

export interface TeamLeadState {
    teams: Team[]
    members: Member[]
    projects: Project[]
    tasks: Task[]
    JoinRequests: JoinRequests[]

    loading: boolean
    error: string | null
    status: "pending" | "succeed" | "rejected"
}