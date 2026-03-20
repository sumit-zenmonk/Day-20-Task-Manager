export interface CommentUser {
    uuid: string;
    username: string;
    email: string;
}

export interface Comment {
    uuid: string;
    parent_uuid: string | null;
    task_uuid: string;
    comment: string;
    comment_user: CommentUser;
    created_at: string;
}

export interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}