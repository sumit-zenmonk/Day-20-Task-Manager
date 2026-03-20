"use client"

import { useEffect } from "react"
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material"
import styles from "./task.module.css"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema, TaskSchemaType } from "@/types/taskCreate"
import {
    createTask,
    getProjectsByTeam,
    getMembersByTeam,
    updateTaskStatus
} from "@/redux/feature/teamlead/teamLeadAction"
import { RootState } from "@/redux/store"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { enqueueSnackbar } from "notistack"

export default function TaskPage() {
    const dispatch = useAppDispatch()
    const params = useParams()
    const project_uuid = params?.project_uuid as string
    const team_uuid = params?.team_uuid as string
    const router = useRouter();

    const { error, members, tasks } = useAppSelector((state: RootState) => state.teamLeadReducer)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            task_name: "",
            assigned_to: "",
            deadline: ""
        }
    })

    useEffect(() => {
        if (project_uuid) {
            dispatch(getProjectsByTeam(team_uuid))
            dispatch(getMembersByTeam())
        }
    }, [project_uuid, team_uuid, dispatch])

    const onSubmit = async (data: TaskSchemaType) => {
        try {
            await dispatch(
                createTask({
                    ...data,
                    project_uuid
                })
            ).unwrap()
        } catch (error) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
        } finally {
            reset()
        }
    }

    const handleStatusChange = async (task_uuid: string, status: string) => {
        try {
            await dispatch(updateTaskStatus({ task_uuid, status })).unwrap();
        } catch (error) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.formSection}>
                <Typography className={styles.title}>
                    Create Task
                </Typography>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                >
                    <TextField
                        label="Task Name"
                        fullWidth
                        {...register("task_name")}
                        error={!!errors.task_name}
                        helperText={errors.task_name?.message}
                    />

                    <TextField
                        select
                        label="Assign To"
                        fullWidth
                        {...register("assigned_to")}
                        error={!!errors.assigned_to}
                        helperText={errors.assigned_to?.message}
                    >
                        {members
                            .filter(
                                (member: any) =>
                                    member.team_uuid === team_uuid
                            )
                            .map((member: any) => (
                                <MenuItem
                                    key={member.uuid}
                                    value={member.user?.uuid}
                                >
                                    {member.user?.username ||
                                        member.user?.email}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        type="datetime-local"
                        fullWidth
                        {...register("deadline")}
                        error={!!errors.deadline}
                        helperText={errors.deadline?.message}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.button}
                    >
                        Create Task
                    </Button>

                    {error && (
                        <Typography className={styles.error}>
                            {error}
                        </Typography>
                    )}
                </form>

                <Box className={styles.taskSection}>
                    <Typography className={styles.taskTitle}>
                        Project Tasks
                    </Typography>

                    {
                        tasks
                            .filter(
                                (task: any) =>
                                    task.project_uuid === project_uuid
                            )
                            .map((task: any) => (
                                <Box key={task.uuid} className={styles.taskCard}>
                                    <Box className={styles.taskInfo}>
                                        <Typography className={styles.taskName}>
                                            {task.task_name}
                                        </Typography>
                                        <Typography className={styles.taskStatus}>
                                            {task.task_status}
                                        </Typography>
                                    </Box>

                                    <Button onClick={() => router.push(`/task/comment/${task.uuid}`)}>
                                        Comment Section
                                    </Button>

                                    <TextField
                                        select
                                        value={task.task_status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                task.uuid,
                                                e.target.value
                                            )
                                        }
                                        className={styles.statusSelect}
                                    >
                                        <MenuItem value="pending">
                                            Pending
                                        </MenuItem>
                                        <MenuItem value="in_progress">
                                            In Progress
                                        </MenuItem>
                                        <MenuItem value="completed">
                                            Completed
                                        </MenuItem>
                                    </TextField>
                                </Box>
                            ))
                    }
                </Box>
            </Box>
        </Box>
    )
}