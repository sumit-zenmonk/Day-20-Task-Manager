"use client"

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { SignupSchemaType } from "@/types/signup"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (data: SignupSchemaType, { rejectWithValue }) => {
        try {
            const { confirmPassword, ...payload } = data

            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
)

export const googleLogin = createAsyncThunk(
    "auth/google",
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider()
            const firebaseRes = await signInWithPopup(auth, provider)

            const token = await firebaseRes.user.getIdToken()

            const res = await fetch(`${API_URL}/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ token })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || "Google login failed")

            return result;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth)
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            })

            return null
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)