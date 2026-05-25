const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Optimized for speed with edge-ready architecture and minimal bundle size.",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance built in from day one.",
  },
  {
    icon: "✨",
    title: "Beautiful by Default",
    description:
      "Premium components and design tokens that make every screen shine.",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Live dashboards and insights so you always know what is happening.",
  },
  {
    icon: "🔗",
    title: "Seamless Integrations",
    description:
      "Connect your favorite tools with one-click integrations.",
  },
  {
    icon: "🌍",
    title: "Global Scale",
    description:
      "Deploy worldwide with automatic scaling and 99.9% uptime SLA.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Powerful features designed for modern teams who demand excellence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-500/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
