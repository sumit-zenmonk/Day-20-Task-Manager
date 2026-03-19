"use client"

import { resetAuth, resetAuthError } from "@/redux/feature/Auth/authSlice";
import { RootState } from "@/redux/store";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FireBaseErrorWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const { error, status } = useSelector((state: RootState) => state.authReducer);

    useEffect(() => {
        if (status === 'succeed') {
            enqueueSnackbar("Success!", { variant: "success" });
            dispatch(resetAuthError());
        }
        if (status === 'rejected') {
            enqueueSnackbar(error || "An error occurred", { variant: "error" });
            dispatch(resetAuth());
        }
    }, [error, status]);

    return <>{children}</>;
}