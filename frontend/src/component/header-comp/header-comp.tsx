"use client"

import { usePathname, useRouter } from "next/navigation"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { logoutUser } from "@/redux/feature/Auth/authAction"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import "./header-comp.css"
import { useState } from "react"
import { RoleEnum } from "@/enums/user.role"

export default function HeaderComp() {
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector(
        (state: RootState) => state.authReducer
    )

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleLogOut = async () => {
        await dispatch(logoutUser()).unwrap()
        localStorage.clear()
        router.replace("/login")
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <header className="header">
            <Box className="left-container">
                <p>Task Manager</p>
            </Box>

            <Box className="right-container">
                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={handleMenuOpen}
                >
                    Menu
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >

                    <MenuItem
                        onClick={() => {
                            router.push("/")
                            handleMenuClose()
                        }}
                    >
                        Home
                    </MenuItem>

                    {user?.role === RoleEnum.USER && (
                        <>
                            <MenuItem
                                onClick={() => {
                                    router.push("/user/team")
                                    handleMenuClose()
                                }}
                            >
                                My Teams
                            </MenuItem>
                        </>
                    )}

                    {user?.role === RoleEnum.TEAM_LEAD && (
                        <>
                            <MenuItem
                                onClick={() => {
                                    router.push("/lead/team")
                                    handleMenuClose()
                                }}
                            >
                                Manage Teams
                            </MenuItem>
                        </>
                    )}

                    {user ? (
                        <MenuItem
                            sx={{ color: "red" }}
                            onClick={async () => {
                                await handleLogOut()
                                handleMenuClose()
                            }}
                        >
                            Log Out
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                router.push("/login")
                                handleMenuClose()
                            }}
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </header>
    )
}