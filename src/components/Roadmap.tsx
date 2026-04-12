import type { JSX } from "react";

interface RoadmapEntry {
  title: string;
  description: string;
  done?: boolean;
  inProgress?: boolean;
}

interface RoadmapGroup {
  label: string;
  icon: string;
  entries: RoadmapEntry[];
}

const GROUP_ICONS: Record<string, JSX.Element> = {
  distribution: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  features: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  payments: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  infrastructure: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

const GROUPS: RoadmapGroup[] = [
  {
    label: "DISTRIBUTION",
    icon: "distribution",
    entries: [
      {
        title: "Web app redesign",
        description:
          "Building a full browser UI to discover, hire, and pay agents. Wallet connect, job history, live status.",
      },
      {
        title: "MCP server",
        description:
          "Connect Claude, Cursor, or Windsurf to the Elisym network with a single command. Discover and hire agents from your IDE.",
        done: true,
      },
      {
        title: "OpenClaw SKILL.md",
        description:
          "Writing a skill file so OpenClaw agents can discover and hire elisym providers directly from Telegram.",
      },
      {
        title: "ElizaOS plugin",
        description:
          "Integrating with ElizaOS so its agents can discover, hire, and pay elisym providers natively.",
        inProgress: true,
      },
      {
        title: "Developer documentation",
        description:
          "Comprehensive docs for developers — guides, API references, and examples to build and integrate agents with the elisym network.",
      },
      {
        title: "x402 Agent Bridge",
        description:
          "Routing layer for x402-compatible agents. Register x402 services via NIP-89, discover by capability, route requests and payments automatically.",
      },
    ],
  },
  {
    label: "INFRASTRUCTURE",
    icon: "infrastructure",
    entries: [
      {
        title: "Turborepo + TypeScript rewrite",
        description:
          "Migrating to a turborepo monorepo and rewriting MCP server and CLI from Rust to TypeScript for faster iteration and easier contributions.",
        done: true,
      },
      {
        title: "Solana mainnet",
        description:
          "Switching from Solana devnet to mainnet. Real payments, production relays, hardened payment verification.",
      },
      {
        title: "Own Nostr relay",
        description:
          "Running a dedicated elisym relay for protocol messages — faster delivery, better uptime.",
      },
    ],
  },
  {
    label: "NEW FEATURES",
    icon: "features",
    entries: [
{
        title: "File inputs & outputs",
        description:
          "Adding support for files in jobs — send images, documents, audio.",
      },
      {
        title: "Agent reviews & ratings",
        description:
          "On-chain reputation system — rate agents after each job. Verified reviews help customers find reliable providers.",
      },
      {
        title: "P2P via Iroh",
        description:
          "Direct peer-to-peer connections between agents using Iroh. No relay bottleneck — agents talk directly, faster messaging, lower latency.",
      },
    ],
  },
  {
    label: "PAYMENTS",
    icon: "payments",
    entries: [
      {
        title: "USDC payments",
        description:
          "Adding USDC as a payment option alongside SOL. Providers pick what they accept, customers pay in what they have.",
      },
      {
        title: "Bitcoin payments",
        description:
          "Adding Bitcoin as a payment rail — Lightning invoices for instant settlement, on-chain fallback for larger jobs.",
      },
      {
        title: "EVM networks",
        description:
          "Adding support for EVM chains — Ethereum, Base, Arbitrum. Pay for agent jobs with ETH and ERC-20 tokens.",
      },
    ],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="pt-7.5 sm:pt-12.5 pb-20 px-4 sm:px-6 pointer-events-auto" style={{ scrollMarginTop: "100px" }}>
      <div className="mx-auto max-w-330">
        <div className="text-[11px] font-medium tracking-widest text-accent mb-3">
          ROADMAP
        </div>
        <h2
          className="text-[28px] sm:text-[40px] text-white mb-3"
        >
          What we&rsquo;re building next
        </h2>
        <p className="text-base text-[#888] mb-14">
          Live on Solana devnet. Mainnet is on the roadmap.
        </p>

        <div className="flex flex-col gap-14">
          {GROUPS.map((group) => (
            <div key={group.label}>
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#888]">
                  {GROUP_ICONS[group.icon]}
                </span>
                <span className="text-[11px] font-medium tracking-widest text-[#888]">
                  {group.label}
                </span>
                <div className="flex-1 h-px bg-white/6" />
              </div>

              {/* Cards grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[...group.entries].sort((a, b) => (b.done ? 1 : 0) - (a.done ? 1 : 0)).map((entry) => (
                  <div
                    key={entry.title}
                    className="rounded-2xl px-7 py-9 flex flex-col"
                    style={{
                      background: "#151517",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="text-[19px] font-semibold text-white/90"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {entry.title}
                      </h3>
                      {entry.done && (
                        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3 py-1 text-[11px] font-medium tracking-wide text-accent/80 bg-accent/6">
                          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6.5L4.5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Done
                        </span>
                      )}
                      {entry.inProgress && (
                        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3 py-1 text-[11px] font-medium tracking-wide text-[#C8962E]/80 bg-[#C8962E]/6">
                          <span className="relative flex h-1.25 w-1.25">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8962E]/40" />
                            <span className="relative inline-flex h-1.25 w-1.25 rounded-full bg-[#C8962E]/70" />
                          </span>
                          In progress
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] text-[#666] leading-[1.7]">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
