"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthCard } from "../../components/auth/AuthCard";
import { Button } from "../../components/ui/Button";

export default function ForgotPasswordForm() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setSent(true)
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const res = await fetch("/api/auth/me")
  //     if (res.ok) {
  //       router.replace("/home")
  //     }
  //   }
  //   checkAuth()
  // }, [])

  if (sent) {
    return (
      <AuthCard
        title="Check your email!"
        subtitle={`Reset link sent to ${email}`}
        footer={
          <Link href="/login" className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300">
            Back to login
          </Link>
        }
      />
    )
  }

  return (
    <AuthCard
      title="Forgot the password"
      subtitle="Enter your email and we'll send you a reset link"
      footer={
        <>
          Remember your password?{" "}
          <Link href="/login" className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300">
            Login
          </Link>
          <br />
          <span className="mt-2 inline-block">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300">
              Sign up
            </Link>
          </span>
        </>
      }
    >
      <div className="space-y-5" role="form" aria-label="Forgot password form">
        <div className="border-b border-white/10 pb-5" />
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input-field"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading} variant="primary" size="lg" className="w-full">
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </div>
    </AuthCard>
  );
}