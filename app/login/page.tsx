'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    // Handle form submission
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // Simple validation: both fields must be filled
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        setError(null)

        // Attempt to sign in with NextAuth credentials provider
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        setLoading(false)

        // Redirect on success, show error on failure
        if (res?.ok) {
            router.push("/dashboard")
        } else {
            setError("Login failed, please check your email and password")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            {/* Page title */}
            <h4 className="mb-6 text-2xl font-bold text-center">
                Login
            </h4>

            {/* Error message */}
            {error && (
                <p className="mb-4 text-center text-red-500">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                {/* Email input */}
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />

                {/* Password input */}
                <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="
            w-full mb-6
            border border-[#ededed] rounded
            px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
          "
                />

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="
            w-full h-11
            bg-black text-white text-base
            rounded
            hover:bg-gray-800
            disabled:opacity-50 disabled:cursor-not-allowed
          "
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    )
}
