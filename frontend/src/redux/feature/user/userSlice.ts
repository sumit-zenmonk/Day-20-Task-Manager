"use client"

import { createSlice } from "@reduxjs/toolkit"
import { Task, TaskStatus, UserState } from "./userType"
import {
    getAllTasks,
    getJoinRequests,
    getProjects,
    getTeams,
    getTeamsIn,
    joinTeam,
    updateTaskStatus
} from "./userAction"

const initialState: UserState = {
    teams: [],
    teamsIn: [],
    members: [],
    projects: [],
    tasks: [],
    joinRequests: [],
    loading: false,
    error: null,
    status: "pending"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.loading = false
            state.error = null
            state.status = "pending"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeams.fulfilled, (state, action) => {
                state.teams = action.payload.data
                state.error = null
            })
            .addCase(joinTeam.pending, (state) => {
                state.loading = true
            })
            .addCase(joinTeam.fulfilled, (state, action) => {
                state.loading = false
                state.joinRequests.push(action.payload.data)
            })
            .addCase(joinTeam.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getJoinRequests.fulfilled, (state, action) => {
                state.joinRequests = action.payload.data
            })
            .addCase(getTeamsIn.pending, (state) => {
                state.loading = true
            })
            .addCase(getTeamsIn.fulfilled, (state, action) => {
                state.loading = false
                state.teamsIn = action.payload.data
            })
            .addCase(getTeamsIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getProjects.pending, (state) => {
                state.loading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.data
                state.error = null
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.data
                state.error = null
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const { status, task_uuid } = action.meta.arg;

                const task = state.tasks.find((t) => t.uuid === task_uuid)
                if (task) {
                    task.task_status = status as TaskStatus
                }

                state.error = null
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
})

export const { resetUserState } = userSlice.actions
export default userSlice.reducer