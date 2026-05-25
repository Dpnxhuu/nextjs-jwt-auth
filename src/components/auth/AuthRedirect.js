"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        router.replace("/home")
      }
    }
    checkAuth()
  }, [])

  return null  // kuch render nahi karta
}