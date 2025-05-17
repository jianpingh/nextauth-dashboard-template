'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [error, setError] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        if (res.ok) {
            alert("注册成功！请登录")
            router.push("/login")
        } else {
            setError(data.error || "注册失败")
        }
    }

    return (
        <div>
            <h2>注册账号</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="姓名"
                    required
                />
                <br />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="邮箱"
                    type="email"
                    required
                />
                <br />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="密码"
                    type="password"
                    required
                />
                <br />
                <button type="submit">注册</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>已有账号？<a href="/login">去登录</a></p>
        </div>
    )
}
