export function AuthDivider() {
  return (
    <div className="relative flex items-center py-1">
      <div className="grow border-t border-white/10" />
      <span className="mx-4 shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-500">
        or
      </span>
      <div className="grow border-t border-white/10" />
    </div>
  );
}
