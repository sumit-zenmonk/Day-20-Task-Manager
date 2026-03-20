"use client"

import React, { useEffect } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import styles from "./team.module.css"
import { useParams } from "next/navigation"
import { RootState } from "@/redux/store"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { useRouter } from "next/navigation"
import { getProjects } from "@/redux/feature/user/userAction"

export default function TeamDetailsPage() {
    const { team_uuid } = useParams()
    const dispatch = useAppDispatch()
    const { projects, error, members, tasks } = useAppSelector(
        (state: RootState) => state.UserReducer
    )
    const router = useRouter()

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    const filteredProjects = Array.isArray(projects)
        ? projects.filter(
            (proj: any) => proj.team?.uuid === team_uuid
        )
        : []

    return (
        <Box className={styles.container}>
            <Box className={styles.Listsection}>
                <Box className={styles.sectionHeader}>
                    <Typography variant="h6">Projects</Typography>
                </Box>

                <Box className={styles.list}>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((proj: any) => (
                            <Box key={proj.uuid} className={styles.fullCard}>
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
                                <Box mt={2}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            router.push(
                                                `/user/team/${team_uuid}/${proj.uuid}`
                                            )
                                        }
                                    >
                                        View Tasks
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography className={styles.empty}>
                            No projects found for this team
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
//  i want show projects to user at this page only nicely on every project it should show a button to view tasks and which redirect to http://localhost:3000/user/team/1b42eaf7-4fa2-4977-8f45-c97edce80929/8dc25874-42ca-4b4d-9d15-303d84234f0c  as  
//   onClick={() =>
//     router.push(
//         `/lead/team/${team_uuid}/${proj.uuid}`
//     )
// }