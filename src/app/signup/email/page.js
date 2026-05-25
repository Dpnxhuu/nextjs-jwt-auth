"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { AuthCard } from "../../../components/auth/AuthCard";
import { AuthDivider } from "../../../components/auth/AuthDivider";
import { GoogleAuthButton } from "../../../components/auth/GoogleAuthButton";
import { Button } from "../../../components/ui/Button";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Sign Up — Lumina",
// };

export default function SignupEmailPage() {

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const router = useRouter();

  const CreateAccount = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields!")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/home")
      } else {
        alert(data.message)
      }

    } catch (error) {
      alert("Something went wrong!")
      console.log(error)
    } finally {
      setLoading(false);
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
      title="Create your account"
      subtitle="Start your journey with Lumina today"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-default font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            Log in
          </Link>
        </>
      }
    >
      <div className="space-y-5" role="form" aria-label="Signup form">

      <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="your name"
            className="input-field"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="input-field"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="input-field"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <Button onClick={CreateAccount} disabled={loading} variant="primary" size="lg" className="w-full">
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>

        <AuthDivider />

        <GoogleAuthButton label="Sign up with Google" />
      </div>
    </AuthCard>
  );
}
