// app/not-found.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/dashboard') // 3 秒后跳转到首页
        }, 3000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>404 - 页面不存在</h1>
            <p>3 秒后将自动返回首页...</p>
        </div>
    )
}
