"use client"
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthCard } from "../../../components/auth/AuthCard";
import { Button } from "../../../components/ui/Button";

export default function ResetPasswordForm() {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      alert("Please fill all fields!")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Password reset successful!")
        router.replace("/login")
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        router.replace("/home")
      }
    }
    checkAuth()
  }, [])

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your new password below"
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleReset} disabled={loading} variant="primary" size="lg" className="w-full">
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </AuthCard>
  )
}