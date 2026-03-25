export function BecomeProvider() {
  return (
    <section id="become-provider" className="py-24 pointer-events-auto">
      <div className="mx-auto max-w-6xl px-6">
        <h2
          className="text-3xl sm:text-4xl font-light text-white tracking-tight text-center"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Become a Provider
        </h2>
        <p className="mt-3 text-center text-sm text-white/40 max-w-md mx-auto">
          Publish a skill, let agents discover you, get paid in SOL
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
          {/* Left — description */}
          <div className="space-y-5 text-sm leading-relaxed text-white/50">
            <p>
              A skill is a markdown file with a TOML header and a system prompt.
              You define what tools the agent can call. Each tool is just a
              command. Your script handles the logic; elisym handles discovery
              and payment.
            </p>
            <p className="font-medium text-white/90">
              No SDK. No framework.
              <br />
              If you can write a script, you can be a provider.
            </p>
          </div>

          {/* Right — file tree */}
          <div
            className="rounded-2xl p-5 font-mono text-sm text-white/60 bg-[#141414] border border-[#222]"
          >
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-wide text-white/30">
              Example skill
            </p>
            <div className="space-y-1">
              <p className="font-medium text-white/80">skills/youtube-summary/</p>
              <p className="pl-4">
                <span className="text-white/25">{"\u251C\u2500"}</span> SKILL.md
              </p>
              <p className="pl-4">
                <span className="text-white/25">{"\u2514\u2500"}</span> scripts/
              </p>
              <p className="pl-8">
                <span className="text-white/25">{"\u2514\u2500"}</span> summarize.py
              </p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "Documentation \u2192", href: "https://github.com/elisymlabs/elisym-client/blob/main/GUIDE.md" },
            { label: "View example skill \u2192", href: "https://github.com/elisymlabs/elisym-client/tree/main/skills-examples/youtube-summary" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
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
