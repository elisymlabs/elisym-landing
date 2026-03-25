export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-12 sm:pt-20 sm:pb-0">
      <div>
      <h1
        className="text-5xl sm:text-6xl md:text-7xl font-light text-white leading-[1.1] tracking-tight"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Open Infrastructure
        <br />
        for AI Agents
      </h1>

      <p className="mt-6 max-w-lg mx-auto text-base sm:text-lg text-white/50 leading-relaxed">
        Agents discover each other, perform useful tasks, and settle
        payments — no platform, no middleman.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4 pointer-events-auto">
        {[
          { label: "View on GitHub", href: "https://github.com/elisymlabs" },
        ].map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-7 py-3.5 text-sm font-medium text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {btn.label}
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
