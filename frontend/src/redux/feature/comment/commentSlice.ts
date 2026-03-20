"use client";

import { createSlice } from "@reduxjs/toolkit";
import { CommentsState } from "./commentType";
import { getComments, addComment } from "./commentAction";

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { parent_uuid } = action.meta.arg;
                state.loading = false;

                state.comments.unshift({
                    ...action.payload,
                    parent_uuid: parent_uuid,
                    comment_user: action.payload.comment_user
                });
                state.error = null
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default commentSlice.reducer;