"use client";

import { Box, Button, Typography, TextField } from "@mui/material";
import styles from "./task_comment.module.css";
import { useState } from "react";

export default function CommentComp({ data, parent, add }: any) {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    const handleSend = (parentId: string) => {
        if (replyText.trim()) {
            add(parentId, replyText);
            setReplyText("");
            setReplyingTo(null);
        }
    };

    return (
        <>
            {data
                .filter((c: any) => c.parent_uuid === parent)
                .map((c: any) => (
                    <Box key={c.uuid} className={styles.commentBox} sx={{ mb: 2, ml: parent ? 3 : 0 }}>
                        <Typography variant="caption" color="textSecondary">
                            {c.comment_user?.email}  {c.created_at}
                        </Typography>

                        <Typography className={styles.text}>
                            {c.comment}
                        </Typography>

                        {replyingTo === c.uuid ? (
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <TextField
                                    autoFocus
                                    size="small"
                                    fullWidth
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend(c.uuid)}
                                />
                                <Button variant="contained" size="small" onClick={() => handleSend(c.uuid)}>
                                    Send
                                </Button>
                                <Button size="small" color="error" onClick={() => setReplyingTo(null)}>
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <Button size="small" onClick={() => setReplyingTo(c.uuid)}>
                                Reply
                            </Button>
                        )}

                        <Box className={styles.children}>
                            <CommentComp data={data} parent={c.uuid} add={add} />
                        </Box>
                    </Box>
                ))}
        </>
    );
}
