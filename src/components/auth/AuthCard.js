export function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-violet-500/30">
            L
          </span>
          <h1 className="mt-6 text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
          )}
        </div>

        {children && (
          <div className="glass-strong rounded-2xl p-6 sm:p-8">{children}</div>
        )}
        {footer && (
          <p className="mt-6 text-center text-sm text-zinc-400">{footer}</p>
        )}
      </div>
    </div>
  );
}
