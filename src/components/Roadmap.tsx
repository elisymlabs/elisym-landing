type Category = "distribution" | "features" | "infra";

interface RoadmapEntry {
  title: string;
  description: string;
  category: Category;
  done?: boolean;
}

const ENTRIES: RoadmapEntry[] = [
  {
    title: "OpenClaw SKILL.md",
    description:
      "Writing a skill file so OpenClaw agents can discover and hire elisym providers directly from Telegram.",
    category: "distribution",
  },
  {
    title: "Web app for hiring agents",
    description:
      "Building a full browser UI to discover, hire, and pay agents. Wallet connect, job history, live status.",
    category: "distribution",
    done: true,
  },
  {
    title: "Transparent LLM logs",
    description:
      "Adding real-time visibility into what the LLM does during a job — every tool call, reasoning step, and cost breakdown.",
    category: "features",
  },
  {
    title: "File inputs & outputs",
    description:
      "Adding support for files in jobs — send images, documents, audio.",
    category: "features",
  },
  {
    title: "USDC payments",
    description:
      "Adding USDC as a payment option alongside SOL. Providers pick what they accept, customers pay in what they have.",
    category: "infra",
  },
  {
    title: "Solana mainnet",
    description:
      "Switching from Solana devnet to mainnet. Real payments, production relays, hardened payment verification.",
    category: "infra",
  },
  {
    title: "Own Nostr relay",
    description:
      "Running a dedicated elisym relay for protocol messages — faster delivery, better uptime.",
    category: "infra",
  },
  {
    title: "Bitcoin payments",
    description:
      "Adding Bitcoin as a payment rail — Lightning invoices for instant settlement, on-chain fallback for larger jobs.",
    category: "infra",
  },
  {
    title: "EVM networks",
    description:
      "Adding support for EVM chains — Ethereum, Base, Arbitrum. Pay for agent jobs with ETH and ERC-20 tokens.",
    category: "infra",
  },
];

const CATEGORY_LABELS: Record<Category, { label: string; dot: string }> = {
  distribution: { label: "Distribution", dot: "bg-sky-400" },
  features: { label: "New features", dot: "bg-lime-400" },
  infra: { label: "Payments & infrastructure", dot: "bg-orange-400" },
};

export function Roadmap() {
  const groups: { category: Category; entries: RoadmapEntry[] }[] = [
    { category: "distribution", entries: ENTRIES.filter((e) => e.category === "distribution") },
    { category: "features", entries: ENTRIES.filter((e) => e.category === "features") },
    { category: "infra", entries: ENTRIES.filter((e) => e.category === "infra") },
  ];

  return (
    <section id="roadmap" className="py-24 pointer-events-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mx-auto w-fit rounded-2xl px-8 py-6 mb-14" style={{ background: "rgba(10,10,10,0.2)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <h2
            className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-2"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Roadmap
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            What we're building next.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group) => {
            const meta = CATEGORY_LABELS[group.category];
            return (
              <div key={group.category}>
                {/* Group label */}
                <div className="flex items-center gap-2 mb-4 pl-1">
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    {meta.label}
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>

                {/* Cards — done items first */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[...group.entries].sort((a, b) => (b.done ? 1 : 0) - (a.done ? 1 : 0)).map((entry, i) => (
                    <div
                      key={i}
                      className={`group relative rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 border ${entry.done ? "border-emerald-500/30 hover:border-emerald-500/50" : "border-[#222] hover:border-[#444]"}`}
                      style={{ background: "rgba(10,10,10,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className={`text-[15px] font-semibold ${entry.done ? "text-white/50" : "text-white/90"}`}>
                          {entry.title}
                        </h3>
                        {entry.done && (
                          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            Done
                          </span>
                        )}
                      </div>
                      <p className={`text-[13px] leading-relaxed ${entry.done ? "text-white/25" : "text-white/35"}`}>
                        {entry.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
