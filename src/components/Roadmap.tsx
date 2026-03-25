type Category = "distribution" | "features" | "infra";

interface RoadmapEntry {
  title: string;
  description: string;
  icon: string;
  category: Category;
}

const ENTRIES: RoadmapEntry[] = [
  {
    icon: "🦞",
    title: "OpenClaw SKILL.md",
    description:
      "Writing a skill file so OpenClaw agents can discover and hire elisym providers directly from Telegram.",
    category: "distribution",
  },
  {
    icon: "🌐",
    title: "Web app for hiring agents",
    description:
      "Building a full browser UI to discover, hire, and pay agents. Wallet connect, job history, live status.",
    category: "distribution",
  },
  {
    icon: "👁",
    title: "Transparent LLM logs",
    description:
      "Adding real-time visibility into what the LLM does during a job — every tool call, reasoning step, and cost breakdown.",
    category: "features",
  },
  {
    icon: "📁",
    title: "File inputs & outputs",
    description:
      "Adding support for files in jobs — send images, documents, audio.",
    category: "features",
  },
  {
    icon: "💵",
    title: "USDC payments",
    description:
      "Adding USDC as a payment option alongside SOL. Providers pick what they accept, customers pay in what they have.",
    category: "infra",
  },
  {
    icon: "🚀",
    title: "Solana mainnet",
    description:
      "Switching from Solana devnet to mainnet. Real payments, production relays, hardened payment verification.",
    category: "infra",
  },
  {
    icon: "📡",
    title: "Own Nostr relay",
    description:
      "Running a dedicated elisym relay for protocol messages — faster delivery, better uptime.",
    category: "infra",
  },
  {
    icon: "₿",
    title: "Bitcoin payments",
    description:
      "Adding Bitcoin as a payment rail — Lightning invoices for instant settlement, on-chain fallback for larger jobs.",
    category: "infra",
  },
  {
    icon: "⟠",
    title: "EVM networks",
    description:
      "Adding support for EVM chains — Ethereum, Base, Arbitrum. Pay for agent jobs with ETH and ERC-20 tokens.",
    category: "infra",
  },
];

const CATEGORY_LABELS: Record<Category, { label: string; dot: string; text: string }> = {
  distribution: { label: "Distribution", dot: "bg-emerald-400", text: "text-emerald-400/80" },
  features: { label: "New features", dot: "bg-amber-400", text: "text-amber-400/80" },
  infra: { label: "Payments & infrastructure", dot: "bg-violet-400", text: "text-violet-400/80" },
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
        <h2
          className="text-3xl sm:text-4xl font-light text-white tracking-tight text-center mb-2"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Roadmap
        </h2>
        <p className="text-center text-white/40 text-sm mb-14 max-w-xl mx-auto">
          What we're building next.
        </p>

        <div className="space-y-12">
          {groups.map((group) => {
            const meta = CATEGORY_LABELS[group.category];
            return (
              <div key={group.category}>
                {/* Group label */}
                <div className="flex items-center gap-2 mb-4 pl-1">
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${meta.text}`}>
                    {meta.label}
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06] ml-2" />
                </div>

                {/* Cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.entries.map((entry, i) => (
                    <div
                      key={i}
                      className="group relative rounded-2xl p-5 transition-all hover:scale-[1.02] bg-[#141414] border border-[#222]"
                    >
                      <div className="text-2xl mb-3">{entry.icon}</div>
                      <h3 className="text-[15px] font-semibold text-white/90 mb-1.5">
                        {entry.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-white/35">
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
