"use client";

import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import styles from "./task_comment.module.css";
import CommentComp from "@/component/comment-comp/comment-comp";
import { useParams } from "next/navigation";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { addComment, getComments } from "@/redux/feature/comment/commentAction";

export default function TaskCommentPage() {
    const [text, setText] = useState("");
    const params = useParams();
    const dispatch = useAppDispatch();
    const { comments, loading } = useAppSelector((state: RootState) => state.commentReducer);

    const task_uuid = Array.isArray(params.task_uuid) ? params.task_uuid[0] : params.task_uuid || '';

    useEffect(() => {
        if (task_uuid) {
            dispatch(getComments({ task_uuid }));
        }
    }, [task_uuid, dispatch]);

    const handleAdd = (parent_uuid: string | null, comment: string) => {
        if (!comment.trim()) return;

        dispatch(addComment({ task_uuid, comment, parent_uuid }));
        setText("");
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.inputBox}>
                <TextField
                    fullWidth
                    size="small"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a task review..."
                />

                <Button
                    variant="contained"
                    onClick={() => handleAdd(null, text)}
                >
                    Post
                </Button>
            </Box>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <CommentComp data={comments} parent={null} add={handleAdd} />
            )}
        </Box>
    );
}