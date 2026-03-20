import { z } from "zod"

export const projectSchema = z.object({
    project_name: z.string().min(8, "Project name should be of 8 letter"),
    project_deadline: z.string().min(1, "Deadline is required")
})

export type ProjectSchemaType = z.infer<typeof projectSchema>