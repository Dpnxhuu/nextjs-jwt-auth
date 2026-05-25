export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-xs font-bold text-white">
              L
            </span>
            <span className="text-sm font-medium text-zinc-400">
              © {new Date().getFullYear()} Lumina. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <span className="cursor-default transition-colors hover:text-zinc-300">
              Privacy
            </span>
            <span className="cursor-default transition-colors hover:text-zinc-300">
              Terms
            </span>
            <span className="cursor-default transition-colors hover:text-zinc-300">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
