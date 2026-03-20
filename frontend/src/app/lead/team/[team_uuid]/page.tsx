"use client"

import React, { useEffect } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import styles from "./team.module.css"
import { useParams } from "next/navigation"
import {
    createProject,
    getProjectsByTeam
} from "@/redux/feature/teamlead/teamLeadAction"
import { RootState } from "@/redux/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, ProjectSchemaType } from "@/types/projectCreate"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useRouter } from "next/navigation"

export default function TeamDetailsPage() {
    const { team_uuid } = useParams()
    const dispatch = useAppDispatch()
    const { projects, error } = useAppSelector(
        (state: RootState) => state.teamLeadReducer
    )
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ProjectSchemaType>({
        resolver: zodResolver(projectSchema)
    })

    useEffect(() => {
        if (team_uuid) {
            dispatch(getProjectsByTeam(team_uuid as string))
        }
    }, [team_uuid, dispatch])

    const onSubmit = async (data: ProjectSchemaType) => {
        await dispatch(
            createProject({
                ...data,
                team_uuid: team_uuid as string
            })
        )
        dispatch(getProjectsByTeam(team_uuid as string))
        reset()
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.headersection}>
                <Box className={styles.sectionHeader}>
                    <Typography variant="h6">Create Project</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField
                        label="Project Name"
                        fullWidth
                        {...register("project_name")}
                        error={!!errors.project_name}
                        helperText={errors.project_name?.message}
                    />

                    <TextField
                        type="datetime-local"
                        fullWidth
                        {...register("project_deadline")}
                        error={!!errors.project_deadline}
                        helperText={errors.project_deadline?.message}
                    />

                    <Button type="submit" variant="contained">
                        Create Project
                    </Button>

                    {error && <Typography color="error">{error}</Typography>}
                </form>
            </Box>

            <Box className={styles.Listsection}>
                <Box className={styles.sectionHeader}>
                    <Typography variant="h6">Projects</Typography>
                </Box>

                <Box className={styles.list}>
                    {Array.isArray(projects) && projects.length > 0 ? (
                        projects.map((proj: any) => (
                            <Box
                                key={proj.uuid}
                                className={styles.fullCard}
                                onClick={() =>
                                    router.push(
                                        `/lead/team/${team_uuid}/${proj.uuid}`
                                    )
                                }
                                sx={{ cursor: "pointer" }}
                            >
                                <Box className={styles.projectHeader}>
                                    <Typography variant="h6">
                                        {proj.project_name}
                                    </Typography>
                                </Box>

                                <Box className={styles.meta}>
                                    <Typography variant="body2">
                                        {new Date(proj.project_deadline).toLocaleString()}
                                    </Typography>
                                </Box>

                            </Box>
                        ))
                    ) : (
                        <Typography className={styles.empty}>
                            No projects found
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}