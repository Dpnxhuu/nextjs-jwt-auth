import Link from "next/link";
import { Button } from "../ui/Button";

export function PublicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass-strong px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
            L
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Lumina
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          </Link>
          <Link href="/signup">
          <Button variant="primary" size="sm">
            Signup
          </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
