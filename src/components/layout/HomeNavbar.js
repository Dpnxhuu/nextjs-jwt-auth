"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export function HomeNavbar({ user, setLogoutLoading }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    try {
      setLogoutLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
    } catch (error) {
      console.log(error.message);
      setLogoutLoading(false);
    }
  };

  const handleDelete = async () => {
    closeMenu();
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmed) return;

    setLogoutLoading(true);
    try {
      const res = await fetch("/api/auth/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        return;
      }
      router.replace("/login");
    } catch (error) {
      console.log(error.message);
      setLogoutLoading(false);
    }
  };

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";
  const userInitial = displayName.charAt(0).toUpperCase();

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
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-sm font-semibold text-white ring-2 ring-white/10"
                aria-hidden
              >
                {userInitial}
              </div>
              <div>
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

          <div className="relative md:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-white/5 bg-[#06060b] p-4 shadow-xl shadow-black/40">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-sm font-semibold text-white ring-2 ring-white/10"
                    aria-hidden
                  >
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-zinc-400">
                      {displayEmail}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Logout
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
