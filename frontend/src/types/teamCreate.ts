import { z } from "zod"

export const createTeamSchema = z.object({
    team_name: z
        .string()
        .min(1, "Team name is required")
        .min(3, "Team name must be at least 3 characters")
})

export type CreateTeamSchemaType = z.infer<typeof createTeamSchema>