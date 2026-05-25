const stats = [
  { label: "Total Projects", value: "24", change: "+3 this week", positive: true },
  { label: "Active Tasks", value: "156", change: "12 due today", positive: null },
  { label: "Team Members", value: "8", change: "2 online now", positive: true },
  { label: "Completion Rate", value: "94%", change: "+2.4% vs last month", positive: true },
];

const recentActivity = [
  { action: "Completed design review", time: "2 hours ago", user: "Sarah" },
  { action: "Deployed v2.4.1 to production", time: "5 hours ago", user: "Mike" },
  { action: "Added 3 new team members", time: "Yesterday", user: "Alex" },
  { action: "Updated project roadmap", time: "2 days ago", user: "Jordan" },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="glass rounded-2xl p-5 transition-all duration-300 hover:border-violet-500/25 hover:bg-white/[0.06]"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            <p
              className={`mt-2 text-xs ${
                stat.positive === true
                  ? "text-emerald-400"
                  : stat.positive === false
                    ? "text-red-400"
                    : "text-zinc-500"
              }`}
            >
              {stat.change}
            </p>
          </article>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-strong rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <ul className="mt-4 space-y-4">
            {recentActivity.map((item, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-zinc-200">{item.action}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    by {item.user} · {item.time}
                  </p>
                </div>
                <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500 mt-2" />
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-strong rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["New Project", "Invite Team", "View Reports", "Settings"].map(
              (label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white cursor-default"
                >
                  {label}
                </button>
              )
            )}
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 p-4 border border-violet-500/20">
            <p className="text-sm font-medium text-violet-200">
              Pro tip
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Use keyboard shortcuts to navigate 40% faster. Press{" "}
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-zinc-300">
                ?
              </kbd>{" "}
              to view all shortcuts.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
