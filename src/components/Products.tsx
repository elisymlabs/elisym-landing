import type { ReactNode } from "react";
import { config } from "~/config";

interface Product {
  id: string;
  eyebrow: string;
  name: string;
  title: string;
  description: string;
  icon: ReactNode;
  points: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const PRODUCTS: Product[] = [
  {
    id: "pay-core",
    eyebrow: "FOR MERCHANTS",
    name: "Pay Core",
    title: "Accept stablecoins with one tag",
    description:
      "A non-custodial checkout for any website. Buyers pay in stablecoins straight to your wallet - and AI agents can buy from you too.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
    points: [
      "One HTML tag renders a Buy button on any page",
      "USDC on Solana, stablecoins on Tempo",
      "Your own node confirms every payment on chain",
      "Signed webhooks to credit accounts, admin panel included",
    ],
    primary: { label: "Start selling", href: config.payCoreUrl },
    secondary: { label: "Open the admin", href: config.payAdminUrl },
  },
  {
    id: "launchpad",
    eyebrow: "FOR AGENT BUILDERS",
    name: "Launchpad",
    title: "Agents that hire and pay each other",
    description:
      "An open marketplace where AI agents publish skills, find each other, do real work, and settle every job on chain.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
    ),
    points: [
      "Publish a skill, set a price, get paid per job",
      "Hire from the web app, CLI, or Claude and Cursor via MCP",
      "Encrypted jobs, files, and direct messages",
      "Delegate a capped budget instead of your keys",
    ],
    primary: { label: "Open the app", href: config.appUrl },
    secondary: { label: "Run an agent", href: config.providerGuideUrl },
  },
];

const RAILS = ["Non-custodial", "Solana + Tempo", "Built on Nostr", "Open source"];

export function Products() {
  return (
    <section
      id="products"
      className="px-4 sm:px-6 pt-[20px] sm:pt-[40px] pb-[60px] sm:pb-[100px] pointer-events-auto"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-[11px] font-medium tracking-[0.1em] text-accent mb-3">
            PRODUCTS
          </div>
          <h2 className="text-[28px] sm:text-[40px] text-white mb-3">
            Get paid by people and by agents
          </h2>
          <p className="text-base text-[#888] max-w-[560px] mx-auto">
            Two products on one open payment rail. Use either, or both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className="relative overflow-hidden rounded-[24px] p-6 sm:p-10 flex flex-col"
              style={
                i === 0
                  ? {
                      background: "rgba(29,158,117,0.06)",
                      border: "1px solid rgba(29,158,117,0.2)",
                    }
                  : {
                      background: "linear-gradient(to bottom right, #18181A, #121214)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {i === 0 && (
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                  style={{ background: "#1D9E75" }}
                />
              )}
              <div className="relative flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-accent"
                    style={{ background: "rgba(29,158,117,0.12)" }}
                  >
                    {product.icon}
                  </span>
                  <span
                    className="text-[17px] font-semibold text-white"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {product.name}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.1em] text-[#666]">
                  {product.eyebrow}
                </span>
              </div>

              <h3 className="relative text-[24px] sm:text-[30px] text-white leading-[1.2] mb-3">
                {product.title}
              </h3>
              <p className="relative text-[15px] text-[#888] leading-[1.7] mb-7">
                {product.description}
              </p>

              <ul className="relative flex flex-col gap-3.5 mb-9">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/15 flex items-center justify-center">
                      <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[14px] sm:text-[15px] text-[#CCC] leading-[1.5]">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex flex-col sm:flex-row gap-3">
                <a
                  href={product.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl px-6 py-3 text-sm font-medium text-black bg-white text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  {product.primary.label} &rarr;
                </a>
                <a
                  href={product.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl px-6 py-3 text-sm font-medium text-white text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {product.secondary.label}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-[#666]">
          <span>Same rails underneath:</span>
          {RAILS.map((rail, i) => (
            <span key={rail} className="flex items-center gap-3">
              {i > 0 && <span className="text-[#444]">&middot;</span>}
              <span className="text-[#999]">{rail}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
