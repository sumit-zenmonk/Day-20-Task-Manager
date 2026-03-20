"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getComments = createAsyncThunk<
    any,
    { task_uuid: string },
    { state: RootState }
>("comments/getComments", async ({ task_uuid }, { getState, rejectWithValue }) => {
    try {
        const token = getState().authReducer.token || ""

        const res = await fetch(`${API_URL}/comment/task?task_uuid=${task_uuid}`, {
            method: "GET",
            headers: {
                Authorization: token
            }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        return data;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const addComment = createAsyncThunk<
    any,
    {
        task_uuid: string;
        comment: string;
        parent_uuid: string | null;
    },
    { state: RootState }
>("comments/addComment", async (data, { getState, rejectWithValue }) => {
    try {
        const token = getState().authReducer.token || ""
        const user = getState().authReducer.user;

        const res = await fetch(`${API_URL}/comment/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        return {
            ...result,
            comment_user: user
        };
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});