"use client"

import React, { useEffect, useState } from "react"
import { Box, TextField, Button, Typography, Modal } from "@mui/material"
import styles from "./team.module.css"
import { RootState } from "@/redux/store"
import { createTeam, deleteTeam, getJoinRequests, getMembersByTeam, getTeams, handleJoinRequest } from "@/redux/feature/teamlead/teamLeadAction"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { enqueueSnackbar } from "notistack"
import { createTeamSchema, CreateTeamSchemaType } from "@/types/teamCreate"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { JoinRequests } from "@/redux/feature/teamlead/teamLeadType"
import { useRouter } from "next/navigation"

export default function TeamPage() {
    const dispatch = useAppDispatch()
    const { teams, loading, error, JoinRequests, members } = useAppSelector((state: RootState) => state.teamLeadReducer);
    const [openModal, setOpenModal] = useState(false)
    const [openJoinModal, setJoinOpenModal] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<any>(null)
    const router = useRouter()

    const handleOpenRequests = () => {
        setJoinOpenModal(true)
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateTeamSchemaType>({
        resolver: zodResolver(createTeamSchema)
    })

    useEffect(() => {
        dispatch(getTeams())
        dispatch(getJoinRequests())
        dispatch(getMembersByTeam())
    }, [dispatch])

    const onSubmit = async (data: CreateTeamSchemaType) => {
        try {
            await dispatch(createTeam(data.team_name)).unwrap()
            enqueueSnackbar("Team created successfully", { variant: "success" })
            reset()
            dispatch(getTeams())
        } catch (err: any) {
            enqueueSnackbar(err || "Something went wrong", { variant: "error" })
        }
    }

    const membersByTeam = members.reduce((acc: any, member: any) => {
        if (!acc[member.team_uuid]) {
            acc[member.team_uuid] = []
        }
        acc[member.team_uuid].push(member)
        return acc
    }, {})

    const handleDelete = async (uuid: string) => {
        try {
            await dispatch(deleteTeam(uuid)).unwrap()
            enqueueSnackbar("Team deleted successfully", { variant: "success" })
        } catch (err: any) {
            enqueueSnackbar(err || "Delete failed", { variant: "error" })
        }
    }

    const handleApprovalRequest = async (uuid: string, status: boolean) => {
        try {
            await dispatch(handleJoinRequest({ uuid, status })).unwrap()

            enqueueSnackbar(
                status ? "Request approved" : "Request rejected",
                { variant: "success" }
            )
        } catch (err: any) {
            enqueueSnackbar(err || "Action failed", { variant: "error" })
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.formSection}>
                <Typography variant="h5" className={styles.title}>
                    Create Team
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField
                        label="Team Name"
                        fullWidth
                        {...register("team_name")}
                        error={!!errors.team_name}
                        helperText={errors.team_name?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        className={styles.button}
                    >
                        {loading ? "Creating..." : "Create Team"}
                    </Button>

                    {error && (
                        <Typography className={styles.error}>
                            {error}
                        </Typography>
                    )}
                </form>
            </Box>

            <Box className={styles.listSection}>
                <Typography variant="h5" className={styles.title}>
                    Team List
                </Typography>

                <Button variant="outlined" onClick={handleOpenRequests}>
                    View Join Requests
                </Button>

                <Box className={styles.list}>
                    {teams?.length > 0 ? (
                        teams.map((team: any) => (
                            <Box key={team.uuid} className={styles.card}>
                                <Typography className={styles.name}>
                                    {team.team_name}
                                </Typography>

                                <Typography className={styles.meta}>
                                    {new Date(team.created_at).toLocaleString()}
                                </Typography>

                                <Button onClick={() => {
                                    setSelectedTeam(team)
                                    setOpenModal(true)
                                }}>
                                    View Members
                                </Button>

                                <Button onClick={() => router.push(`/lead/team/${team.uuid}`)}>
                                    View Team
                                </Button>

                                <Button color="error" onClick={() => handleDelete(team.uuid)}>
                                    Delete
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography>No teams found</Typography>
                    )}
                </Box>

                <Modal open={openJoinModal} onClose={() => setJoinOpenModal(false)} className={styles.modal}>
                    <Box className={styles.modalBox}>
                        <Typography variant="h6">Join Requests</Typography>

                        {JoinRequests?.length === 0 ? (
                            <Typography>No requests found</Typography>
                        ) : (
                            JoinRequests.map((req: JoinRequests) => (
                                <Box
                                    key={req.uuid}
                                    sx={{ mt: 2, p: 1, border: "1px solid #ccc" }}
                                >
                                    <Typography>
                                        Team: {req.team?.team_name}
                                    </Typography>

                                    <Typography variant="body2">
                                        Username: {req.user.username}
                                    </Typography>

                                    <Typography variant="body2">
                                        Email: {req.user.email}
                                    </Typography>

                                    <Typography variant="caption">
                                        {new Date(req.created_at).toLocaleString()}
                                    </Typography>

                                    <Box className={styles.requestActions}>
                                        <Button onClick={() => handleApprovalRequest(req.uuid, true)}>
                                            Approve
                                        </Button>

                                        <Button color="error" onClick={() => handleApprovalRequest(req.uuid, false)}>
                                            Reject
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Modal>

                <Modal open={openModal} onClose={() => setOpenModal(false)} className={styles.modal}>
                    <Box className={styles.modalBox}>
                        <Typography variant="h6">
                            {selectedTeam?.team_name} Members
                        </Typography>

                        {membersByTeam[selectedTeam?.uuid]?.length > 0 ? (
                            membersByTeam[selectedTeam.uuid].map((member: any) => (
                                <Box key={member.uuid} sx={{ mt: 2, p: 1, border: "1px solid #ccc" }}>
                                    <Typography>
                                        {member.user.username}
                                    </Typography>

                                    <Typography variant="body2">
                                        {member.user.email}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography>No members found</Typography>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}