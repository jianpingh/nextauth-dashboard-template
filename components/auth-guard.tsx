'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)

    // 避免 hydration mismatch 闪烁
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [status, router])

    // 在 loading 状态或首次挂载前，不渲染 children
    if (!isMounted || status === "loading" || status === "unauthenticated") {
        return null
    }

    return <>{children}</>
}
