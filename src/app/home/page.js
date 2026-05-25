"use client"
import { HomeNavbar } from "../../components/layout/HomeNavbar";
import { Dashboard } from "../../components/home/Dashboard";
import { useState, useEffect } from "react"
import PageLoader from "@/components/pageloader/PageLoader";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Dashboard — Lumina",
// };

export default function HomePage() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const router = useRouter();


  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (!res.ok) {
        router.replace("/login")
        return
      }
      const data = await res.json()
      setUser(data)
      setLoading(false)
    }
    checkAuth()
  }, [router]);

  if (loading || !user) return <PageLoader />;

  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen">
      <HomeNavbar user={user} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-medium text-violet-400">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back,{" "}
            <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
}
