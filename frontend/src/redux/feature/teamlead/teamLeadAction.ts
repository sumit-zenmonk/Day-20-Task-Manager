"use client"

import { RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const createTeam = createAsyncThunk<
    any,
    string,
    { state: RootState }
>(
    "teamlead/createTeam",
    async (team_name, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/lead/team`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ team_name })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return result
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const getTeams = createAsyncThunk<
    any,
    void,
    { state: RootState }
>(
    "teamlead/getTeams",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/lead/team`, {
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

export const deleteTeam = createAsyncThunk<
    any,
    string,
    { state: RootState }
>(
    "teamlead/deleteTeam",
    async (uuid, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/lead/team`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ uuid })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return uuid
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
    "teamlead/getJoinRequests",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/lead/team/join`, {
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

export const handleJoinRequest = createAsyncThunk<
    string,
    { uuid: string; status: boolean },
    { state: RootState }
>(
    "teamlead/handleJoinRequest",
    async ({ uuid, status }, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/lead/team/join/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ uuid, status })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message)

            return uuid
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)