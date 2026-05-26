"use client"
import { useState } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

export function HomeNavbar({ user, setLogoutLoading }) {
  const router = useRouter();

  const handleLogout = async () => {
  try {
    setLogoutLoading(true)
    await fetch("/api/auth/logout", { method: "POST" })
    router.replace("/login")
  } catch (error) {
    console.log(error.message)
    setLogoutLoading(false)
  }
}

const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete your account?")
  if (!confirmed) return

  setLogoutLoading(true)
  try {
    const res = await fetch("/api/auth/delete", { method: "DELETE" })
    if (!res.ok) {
      const data = await res.json()
      alert(data.message)
      return
    }
    router.replace("/login")
  } catch (error) {
    console.log(error.message)
    setLogoutLoading(false)
  }
}

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06060b]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-sm font-bold text-white">
            L
          </span>
          <span className="text-lg font-semibold text-white">Lumina</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 ring-2 ring-white/10"
              aria-hidden
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{displayName}</p>
              <p className="text-xs text-zinc-500">{displayEmail}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
          <Button onClick={handleDelete} variant="outline" size="sm">
            Delete Account
          </Button>
        </div>
      </nav>
    </header>
  );
}
