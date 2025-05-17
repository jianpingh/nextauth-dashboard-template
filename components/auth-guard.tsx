// components/auth-guard.tsx
'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [status, router])

    if (status === "loading") return <p>加载中...</p>

    return <>{children}</>
}
