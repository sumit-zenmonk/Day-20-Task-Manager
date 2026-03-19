"use client"

import { useEffect } from "react"
import { Box, Button, Typography } from "@mui/material"
import styles from "./team.module.css"
import { RootState } from "@/redux/store"
import { enqueueSnackbar } from "notistack"
import {
    getJoinRequests,
    getTeams,
    getTeamsIn,
    joinTeam
} from "@/redux/feature/user/userAction"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"

export default function TeamPage() {
    const dispatch = useAppDispatch()
    const { teams, teamsIn, joinRequests, loading } = useAppSelector(
        (state: RootState) => state.UserReducer
    )

    const isRequested = (teamUuid: string) => {
        return joinRequests.some(
            (req) => req.team_uuid === teamUuid && req.is_active
        )
    }

    const isMember = (teamUuid: string) => {
        return teamsIn.some((team) => team.uuid === teamUuid)
    }

    useEffect(() => {
        dispatch(getTeams())
        dispatch(getJoinRequests())
        dispatch(getTeamsIn())
    }, [dispatch])

    const handleJoin = async (uuid: string) => {
        try {
            const res = await dispatch(joinTeam(uuid)).unwrap()
            enqueueSnackbar(res.message, { variant: "success" })

            dispatch(getJoinRequests())
            dispatch(getTeamsIn())
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "error" })
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.listSection}>
                <Typography variant="h5" className={styles.title}>
                    My Teams
                </Typography>

                <Box className={styles.list}>
                    {teamsIn?.length > 0 ? (
                        teamsIn.map((team: any) => (
                            <Box key={team.uuid} className={styles.card}>
                                <Typography className={styles.name}>
                                    {team.team_name}
                                </Typography>

                                <Typography className={styles.meta}>
                                    {new Date(team.created_at).toLocaleString()}
                                </Typography>

                                <Button variant="contained" disabled>
                                    Joined
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography>No joined teams</Typography>
                    )}
                </Box>
            </Box>

            <Box className={styles.listSection}>
                <Typography variant="h5" className={styles.title}>
                    All Teams
                </Typography>

                <Box className={styles.list}>
                    {teams?.length > 0 ? (
                        teams
                            .filter((team: any) => !isMember(team.uuid))
                            .map((team: any) => (
                                <Box key={team.uuid} className={styles.card}>
                                    <Typography className={styles.name}>
                                        {team.team_name}
                                    </Typography>

                                    <Typography className={styles.meta}>
                                        {new Date(team.created_at).toLocaleString()}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => handleJoin(team.uuid)}
                                        disabled={
                                            loading || isRequested(team.uuid)
                                        }
                                    >
                                        {isRequested(team.uuid)
                                            ? "Requested"
                                            : "Join Request"}
                                    </Button>
                                </Box>
                            ))
                    ) : (
                        <Typography>No teams found</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}