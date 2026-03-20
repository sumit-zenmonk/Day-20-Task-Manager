"use client"

import { createSlice } from "@reduxjs/toolkit"
import { TeamLeadState } from "./teamLeadType"
import {
    createProject,
    createTeam,
    deleteTeam,
    getJoinRequests,
    getProjectsByTeam,
    getTeams,
    handleJoinRequest
} from "./teamLeadAction"

const initialState: TeamLeadState = {
    teams: [],
    members: [],
    projects: [],
    tasks: [],
    JoinRequests: [],
    loading: false,
    error: null,
    status: "pending"
}

const teamLeadSlice = createSlice({
    name: "teamlead",
    initialState,
    reducers: {
        resetTeamLeadState: (state) => {
            state.loading = false
            state.error = null
            state.status = "pending"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTeam.pending, (state) => {
                state.loading = true
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeed"
                state.error = null
                state.teams.push(action.payload)
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.loading = false
                state.status = "rejected"
                state.error = action.payload as string
            })
            .addCase(getTeams.fulfilled, (state, action) => {
                state.teams = action.payload.data
                state.error = null
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                state.teams = state.teams.filter(
                    (team: any) => team.uuid !== action.payload
                )
            })
            .addCase(getJoinRequests.pending, (state) => {
                state.loading = true
            })
            .addCase(getJoinRequests.fulfilled, (state, action) => {
                state.loading = false
                state.JoinRequests = action.payload
            })
            .addCase(getJoinRequests.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(handleJoinRequest.fulfilled, (state, action) => {
                state.JoinRequests = state.JoinRequests.filter(
                    (req) => req.uuid !== action.payload
                )
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload)
                state.error = null
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getProjectsByTeam.fulfilled, (state, action) => {
                state.projects = action.payload
                state.error = null
            })
            .addCase(getProjectsByTeam.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { resetTeamLeadState } = teamLeadSlice.actions
export default teamLeadSlice.reducer