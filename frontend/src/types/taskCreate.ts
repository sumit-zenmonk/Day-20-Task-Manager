import { z } from "zod"

export const taskSchema = z.object({
    task_name: z.string().min(1, "Task name is required"),
    project_uuid: z.string().min(1, "Project is required"),
    assigned_to: z.string().min(1, "Assignee is required"),
    deadline: z.string().min(1, "Deadline is required")
})

export type TaskSchemaType = z.infer<typeof taskSchema>