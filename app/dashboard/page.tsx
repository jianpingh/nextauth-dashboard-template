'use client'
import AuthGuard from "@/components/auth-guard"
import { signOut, useSession } from "next-auth/react"

export default function DashboardPage() {
    const { data: session } = useSession()

    return (
        <AuthGuard>
            <h1>Dashboard</h1>
            <p>欢迎 {session?.user?.name}</p>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>退出登录</button>
        </AuthGuard>
    )
}
