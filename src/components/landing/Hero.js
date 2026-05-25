import Link from "next/link";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-cyan-500/15 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-violet-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Now in public preview
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gradient">Build something</span>
          <br />
          <span className="text-white">extraordinary</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          Lumina brings premium design, blazing performance, and effortless
          workflows together — so your team can focus on what matters.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          </Link>
          <Link href="/login">
          <Button variant="outline" size="lg">
            Login
          </Button>
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl animate-float">
          <div className="glass-strong rounded-2xl p-1 shadow-2xl shadow-violet-500/10">
            <div className="rounded-xl bg-zinc-900/80 p-6 sm:p-8">
              <div className="flex gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[72, 58, 91].map((val, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/5 p-4 text-left transition-colors hover:bg-white/8"
                  >
                    <p className="text-xs text-zinc-500">Metric {i + 1}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">
                      {val}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
