"use client"
import Link from "next/link";
import { AuthCard } from "../../components/auth/AuthCard";
import { AuthDivider } from "../../components/auth/AuthDivider";
import { GoogleAuthButton } from "../../components/auth/GoogleAuthButton";
import { Button } from "../../components/ui/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// export const metadata = {
//   title: "Login — Lumina",
// };

export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter();

  const handleSubmit = async () => {

    if (!formData.email || !formData.password) {
      alert("Please fill all fields!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        router.replace('/home')
      } else {
        alert(data.message)
      }

    } catch (error) {
      alert("Something went wrong!")
      console.log(error)
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
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            Sign up
          </Link>
        </>
      }
    >
      <div className="space-y-5" role="form" aria-label="Login form">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input-field"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="cursor-default text-sm text-violet-400 transition-colors hover:text-violet-300"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="input-field"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-12 top-46 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <Button onClick={handleSubmit} disabled={loading} variant="primary" size="lg" className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <AuthDivider />

        <GoogleAuthButton label="Sign in with Google" />
      </div>
    </AuthCard>
  );
}
