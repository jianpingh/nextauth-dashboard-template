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

        // Simple form validation
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        setError(null)

        // Trigger NextAuth signIn
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        setLoading(false)

        // Redirect or show error based on response
        if (res?.ok) {
            router.push("/dashboard")
        } else {
            setError("Login failed, please check your email and password")
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '0 16px',
            }}
        >
            {/* Page title */}
            <h4 style={{
                marginBottom: '24px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                Login
            </h4>

            {/* Display error message */}
            {error && (
                <p style={{
                    color: 'red',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    {error}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                {/* Email input */}
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{
                        width: '100%',
                        marginBottom: '12px',
                        borderColor: '#ededed',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '4px',
                        padding: '8px 12px',
                    }}
                />

                {/* Password input */}
                <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                        borderColor: '#ededed',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '4px',
                        padding: '8px 12px',
                    }}
                />

                {/* Submit button with loading state */}
                <Button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        height: '45px',
                        backgroundColor: '#0a0a0a',
                        color: '#ffffff',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    )
}
