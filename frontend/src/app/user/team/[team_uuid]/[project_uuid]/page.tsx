"use client"

import React from "react"
import { Box, Typography, MenuItem, TextField } from "@mui/material"
import { useParams } from "next/navigation"
import { RootState } from "@/redux/store"
import { useAppSelector, useAppDispatch } from "@/redux/hooks.ts"
import { enqueueSnackbar } from "notistack"
import { updateTaskStatus } from "@/redux/feature/user/userAction"

export default function AssignedTasksPage() {
    const dispatch = useAppDispatch()
    const { project_uuid } = useParams()

    const { tasks } = useAppSelector((state: RootState) => state.UserReducer)
    const { user } = useAppSelector((state: RootState) => state.authReducer)

    const myTasks =
        tasks?.filter(
            (task: any) =>
                task.project_uuid === project_uuid &&
                task.assigned_to === user?.uid
        ) || []

    const handleStatusChange = async (task_uuid: string, status: string) => {
        try {
            await dispatch(updateTaskStatus({ task_uuid, status })).unwrap();
        } catch (error) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
        }
    }

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Typography variant="h5" mb={2}>
                My Tasks
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%"
                }}
            >
                {myTasks.length > 0 ? (
                    myTasks.map((task: any) => (
                        <Box
                            key={task.uuid}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                p: 2,
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                width: "100%"
                            }}
                        >
                            <Typography variant="h6">
                                {task.task_name}
                            </Typography>

                            <Typography variant="body2">
                                Deadline:{" "}
                                {new Date(task.deadline).toLocaleString()}
                            </Typography>

                            <TextField
                                select
                                value={task.task_status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        task.uuid,
                                        e.target.value
                                    )
                                }
                                sx={{ width: "50%" }}
                            >
                                <MenuItem value="pending">
                                    Pending
                                </MenuItem>
                                <MenuItem value="in_progress">
                                    In Progress
                                </MenuItem>
                            </TextField>
                        </Box>
                    ))
                ) : (
                    <Typography>
                        No tasks assigned to you
                    </Typography>
                )}
            </Box>
        </Box>
    )
}