"use client"

import { RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const getTeams = createAsyncThunk<
    any,
    void,
    { state: RootState }
>(
    "user/getTeams",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/team`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const joinTeam = createAsyncThunk<
    any,
    string,
    { state: RootState }
>(
    "user/joinTeam",
    async (team_uuid, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/team/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ team_uuid })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const getJoinRequests = createAsyncThunk<
    any,
    void,
    { state: RootState }
>(
    "user/getJoinRequests",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/team/join`, {
                headers: {
                    Authorization: token
                }
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const getTeamsIn = createAsyncThunk<
    any,
    void,
    { state: RootState }
>(
    "user/getTeamsIn",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/teamin`, {
                headers: {
                    Authorization: token
                },
                cache: "no-store"
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const getProjects = createAsyncThunk<
    any,
    void,
    { state: RootState }
>(
    "user/getProjects",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/team/project`, {
                headers: {
                    Authorization: token
                }
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)