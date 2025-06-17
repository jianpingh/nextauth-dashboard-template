// app/dashboard/layout.tsx 或 components/layout.tsx
'use client'
import { ReactNode } from 'react'
import AuthGuard from '@/components/auth-guard'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <div>
                <header>Dashboard Header</header>
                <main>{children}</main>
            </div>
        </AuthGuard>
    )
}
